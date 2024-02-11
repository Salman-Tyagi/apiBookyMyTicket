import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm password is required'],
    validate: {
      validator: function (repeatPass) {
        return repeatPass === this.password;
      },
      message: 'Password did not match',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.password.isModified) {
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    return next();
  }

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
