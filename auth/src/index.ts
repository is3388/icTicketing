import mongoose from 'mongoose';
import { app } from './app';

const connectDB = async () => {
  console.log('Starting up ...');
  if (!process.env.JWT_KEY) {
    // env var for secret key
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    // env var for secret key
    throw new Error('MONGO_URI must be defined');
  }
  try {
    // connect the auth to mongoDB instance via auth-mongo-srv the service of the pod running mongodb
    // default mongodb port listen to traffic is 27017 and auth is the name of database
    //await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {})
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

app.listen(4000, () => {
  console.log('Listening on port 4000!!!');
});

connectDB();
