import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config({ path: '.env' });

const DB = process.env.DEV_DB;

(async () => {
  try {
    await mongoose.connect(DB);
    console.log('DB connected successfully');
  } catch (err) {
    console.log(err);
  }
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, '127.0.0.1', function () {
  console.log('Listening to the port', PORT, 'in', process.env.NODE_ENV);
});
