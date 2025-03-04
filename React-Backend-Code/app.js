const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Message = require('./models/messages.js');
const WorldChat = require('./models/worldChat.js');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(cors({
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));


app.use(express.json());

main().then(()=>{
  console.log('Connected to database !');
}).catch((err)=>{
  console.log(err);
})

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
app.listen(port, ()=>{
  console.log(`listening on port http://localhost:${port}...`);
});

app.get('/', (req, res)=>{
  res.send('<h1>Message Ho raha hai bhai?</h1>');
  console.log('user is online on route -> /');
})

async function findUser(data) {
  const user = await User.findOne(data);
    if (user) {
      return user;
    } else {
      return false;
    }
}

app.get('/api/findSomeone', async (req, res) => {
  let { someone } = req.query;

  try {
    let users = await User.find({ 
      username: { $regex: `^${someone}`, $options: 'i' } 
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found!' });
    }
    const { password: _, ...restUserData } = users[0].toObject(); 
     //console.log(restUserData)
    res.status(200).json({ message: 'Found friend!', user: restUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

app.get('/api/showUser/:id', async (req, res)=>{
  let { id } = req.params;
  let user = await User.findById(id);
  if (user) {
    const { password: _, ...restUserData } = user.toObject();
    res.status(201).json({ message: 'users found!', friend: restUserData })
  } else {
    res.status(500).json({ message: 'can not find users!' })
  }
});

app.get('/api/addFriend/:friendId/to/:id', async (req, res) => {
  
  const { friendId, id } = req.params;

  try {
    let user = await User.findByIdAndUpdate(id, 
   { $addToSet: { friends: friendId } }, { new: true });//user updation
    let userFriend = await User.findByIdAndUpdate(friendId, 
   { $addToSet: { friends: id } }, { new: true });//friend data updation
    console.log(user)
    const { password: _, ...restUserData } = user.toObject();
    //re saving the localStorage when adding friend
    res.status(200).json({ message: 'friend added!', user: restUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
  
});


app.post('/api/user', async (req, res)=>{
    const { username, email, password, confirmPassword } = req.body;
    if (!username && !confirmPassword) {
      //function above
      const user = await findUser(req.body); 
      if (user) {
      console.log(user);
        const { password: _, ...restUserData } = user.toObject();
        res.status(201).json({ message: 'user logged in !', user: restUserData });
      } else {
        res.status(500).json({ message: 'user not in the database !'});
      }
    }
  else if (username && confirmPassword) {
    
    let user = await findUser(req.body);
    if (!user) {
       let newUser = new User({
         username: username, 
         email: email,
         password: password
       });
      if (newUser) {
       await newUser.save();
       const { password: _, ...restUserData } = newUser.toObject();
       res.status(201).json({ message: 'user signup successfully ', user: restUserData });
       console.log('user set to db from SIGNUP ', newUser);
      }
    }
    else {
     res.status(500).json({ message: 'user already exist' });
    }
  }
});

app.get('/api/:sender/:reciever', async (req, res) => {
  const { sender, reciever } = req.params;
  const { content } = req.query;

  try {
    if (content) {
      // Create and save a new message if content is provided
      const msg = new Message({
        MessageBtw_users: [sender, reciever],
        Content: [{
          user: sender,
          Message: content,
        }],
      });
      await msg.save();

      // Update messageId for sender and receiver
      await User.findByIdAndUpdate(sender, {
        $addToSet: { messageId: msg._id },
      });
      await User.findByIdAndUpdate(reciever, {
        $addToSet: { messageId: msg._id },
      });

      console.log('New message saved:', msg);
      return res.status(201).json({ message: 'Message sent!', data: msg });
    } else {
      // Retrieve messages between sender and receiver if no content is provided
      const messages = await Message.find({
        MessageBtw_users: { $all: [sender, reciever] }, // Ensure both users are part of the conversation
      });

      if (messages && messages.length > 0) {
        return res.status(200).json({ messages });
      } else {
        return res.status(404).json({ message: 'No messages found.' });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

/*share to world*/
app.get('/api/:id/toWorld/:message', async (req, res)=>{
  const { id, message } = req.params;
  const msg = new WorldChat({
    user: id,
    message: message
  });
  console.log(msg)
  await msg.save();
  const user = await User.findByIdAndUpdate(id, {
    $addToSet : { worldMessageId: msg._id }}, { new: true });
  if (user) {
    res.status(201).json({ message: 'message posted!'})
    console.log(user)
  } else {
    res.status(500).json({ message: 'cant send!'})
  }
})

app.get('/api/getWorldChat', async (req, res)=>{
  let messages = await WorldChat.find({});
  console.log(messages)
  let users = await User.find(messages.user, 'username avatar _id')
 /* let seperatedDatas = users.map(user => {
    const { password, username, avatar, _id, ...restUserData } = user.toObject(); 
    return { username, avatar, _id };
  })*/
  console.log(users)
  return res.status(201).json({ messages, users });
});

//like updation

app.get('/api/:id/updateWorldMessage/like/:worldMsgId', async (req, res) => {
  const { id, worldMsgId } = req.params;

  try {
    let message = await WorldChat.findById(worldMsgId);

    if (!message) {
      return res.status(404).json({ result: 'Message not found' });
    }

    let updatedMessage;
    
    if (message.likes.includes(id)) {
      // Remove like if user already liked
      updatedMessage = await WorldChat.findByIdAndUpdate(
        worldMsgId,
        { $pull: { likes: id } },
        { new: true }
      );
    } else {
      // Add like if user hasn't liked
      updatedMessage = await WorldChat.findByIdAndUpdate(
        worldMsgId,
        { $addToSet: { likes: id } },
        { new: true }
      );
    }

    res.status(201).json({ result: 'Success', message: updatedMessage });

  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'Error', error: error.message });
  }
});

//comment get 
app.get('/api/commentFrom/:fromId/to/:postId/:comment', async (req, res) => {
  const { fromId, postId, comment } = req.params;

  try {
    const message = await WorldChat.findByIdAndUpdate(
      postId,
      { 
        $push: { comments: { user: fromId, comment: comment, createdAt: new Date() } } 
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: "Post not found" });
    }

    console.log(message);
    const messages = await WorldChat.find({})
    res.status(201).json({ messages });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//comment show user
app.get('/api/commentUser/hi/:id', async (req, res)=>{
  const { id } = req.params;
  console.log(req.params)
  
  const user = await User.findById(id,'username avatar email');
  if (user) {
    res.status(201).json({ message: 'users found', user });
  } else {
    res.status(500).json({ message: 'users not found' });
  }
})
