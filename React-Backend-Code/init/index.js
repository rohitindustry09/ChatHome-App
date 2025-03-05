const mongoose = require('mongoose');
const User = require('../models/user.js');
const Message = require('../models/messages.js');
const WorldChat = require('../models/worldChat.js');
const initData = require('./data.js');
require('dotenv').config({ path: '../.env' });

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database.!');

    await initDb(); // Ensuring initDb runs after connection
  } catch (error) {
    console.error('Database connection error:', error);
  }
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

// Call the function and handle errors properly
main();
