import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

/*
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
  // confirmPassword: {
  //   type: String,
  //   required: [true, 'Confirm password is required'],
  //   validate: {
  //     validator: function (repeatPass) {
  //       return repeatPass === this.password;
  //     },
  //     message: 'Password did not match',
  //   },
  // },
  verified: {
    type: Boolean,
    default: false,
  },
  // verifyToken: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
*/

// DO NOT USE HOOKS, THEY CREATE DEPENCY IN MONGO ENVIRONMENT

// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.password.isModified) {
//     this.password = await bcrypt.hash(this.password, 12);

//     this.confirmPassword = undefined;
//     return next();
//   }

//   next();
// });

// userSchema.pre('save', function (next) {
//   if (this.verifyToken?.isModified) {
//     this.verifyToken = crypto.randomBytes(32).toString('hex');
//     return next();
//   }

//   next();
// });

// userSchema.methods.correctPassword = async function (inputPassword) {
//   return await bcrypt.compare(inputPassword, this.password);
// };

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: String,
    confirmPassword: String,
    OTP: {
      type: Number,
    },
    mobileNumber: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: String,
    birthday: Date,
    identity: String,
    married: Boolean,
    pincode: Number,
    address: String,
    landmark: String,
    city: String,
    state: String,

    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
    passwordChangedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    // To remove __v from document
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
