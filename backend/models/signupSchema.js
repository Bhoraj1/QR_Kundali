import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // You can implement a password regex here if needed
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    isVerified: {
      type: Boolean,
      default: false, // User is not verified initially
    },
    verificationCode: {
      type: String, // This will store the verification code for email verification
    },
    expireTime: {
      type: Number,
      default: 3,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Pre-save middleware to hash password (if needed)
// signUpSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10); // Example hashing with bcrypt
//   }
//   next();
// });

// Model for the user
const SignUpModel = mongoose.model("userDB", signUpSchema);

export default SignUpModel;
