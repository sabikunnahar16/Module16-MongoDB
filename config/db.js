const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mongo_practice';

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected:', uri);
    return uri;
  } catch (err) {
    if (uri !== 'mongodb://127.0.0.1:27017/mongo_practice') {
      throw err;
    }

    if (!memoryServer) {
      memoryServer = await MongoMemoryServer.create();
    }

    const fallbackUri = memoryServer.getUri('mongo_practice');
    await mongoose.connect(fallbackUri);
    console.log('MongoDB connected:', fallbackUri);
    return fallbackUri;
  }
}

module.exports = connectDB;
