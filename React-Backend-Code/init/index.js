const mongoose = require('mongoose');
const User = require('../models/user.js');
const Message = require('../models/messages.js');
const WorldChat = require('../models/worldChat.js');
const initData = require('./data.js');

const uri = "mongodb+srv://rohitindustry09:qwert63838ryul09@reactmessagecluster.9fem2.mongodb.net/?retryWrites=true&w=majority&appName=reactMessageCluster";

async function main() {
  await mongoose.connect(uri);
  console.log('Connected to database .!');

  await initDb(); // Ensuring initDb runs after connection
}

async function initDb() {
  try {
    await User.deleteMany({});
    await Message.deleteMany({});
    await WorldChat.deleteMany({});
    
    console.log('Database emptied successfully!');

    // If you need to insert initial data, uncomment this part
    // const data = await User.insertMany(initData.data);
    // console.log('Inserted data:', data);
  } catch (error) {
    console.error('Error while initializing DB:', error);
  }
}

main().catch((err) => {
  console.error('Database connection error:', err);
});
