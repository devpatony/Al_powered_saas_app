/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

let cached: MongooseConnection = (global as unknown as { mongoose: MongooseConnection }).mongoose;

if (!cached) {
  cached = (global as unknown as { mongoose: MongooseConnection }).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: 'imaginify', // Specify your database name here
    bufferCommands: false,
  }).then((mongoose) => {
    console.log('Connected to MongoDB');
    return mongoose;
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  });

  cached.conn = await cached.promise;

  return cached.conn;
};