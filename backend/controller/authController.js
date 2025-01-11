import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SignUpModel from "../models/signupSchema.js";
import { SendVerificationCode } from "./OTPController.js";
import { sendResetPasswordEmail } from "./emailService.js";

// Signup controller
export const Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await SignUpModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exists. Please verify with OTP.",
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        status: "Fail",
        message: "Password must be at least 5 characters long.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const expireTime = Date.now() + 3 * 60 * 1000;
    const newUser = await SignUpModel.create({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      expireTime,
    });

    SendVerificationCode(newUser.email, verificationCode);

    res.status(200).json({
      status: "Success",
      data: { newUser },
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error during signup", error.message);
    res.status(500).json({ status: "Fail", message: error.message });
  }
};

// Login controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "Fail",
        message: "Please provide both email and password",
      });
    }

    const user = await SignUpModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ status: "Fail", message: "Incorrect email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });
    res.status(200).json({
      status: "Success",
      token,
      data: { user },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error during login", error.message);
    res.status(500).json({ status: "Fail", message: error.message });
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Logout failed" });
  }
};

// Protect middleware to authenticate user
export const protect = async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};

// OTP Verification
export const VerifyOPT = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await SignUpModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.expireTime && user.expireTime < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }
    if (user.verificationCode === otp) {
      user.isVerified = true;
      user.verificationCode = null;
      user.expireTime = null;
      await user.save();

      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP, Please check again" });
    }
  } catch (error) {
    console.error("Error during OTP verification", error.message);
    res.status(500).json({ message: "Error during OTP verification" });
  }
};

// Forgot Password controller
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await SignUpModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  const resetToken = signToken(user._id);
  const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  user.resetToken = resetToken;
  user.resetTokenExpires = resetTokenExpires;
  await user.save();

  const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  await sendResetPasswordEmail(email, resetURL);
  res.status(200).json({ message: "Reset password link sent to your email" });
};

// Reset Password controller
export const resetPassword = async (req, res) => {
  const { password, token, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await SignUpModel.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid token or token expired" });
    }

    user.password = await bcrypt.hash(password, 12);
    user.expireTime = null;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error.message);
    res.status(400).json({ message: "Invalid token or token expired" });
  }
};

// validate-token
export const validateToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await SignUpModel.findById(decoded.id); // Fetch user from database

    if (user && user.isVerified) {
      // Check if user exists and email is verified
      return res.status(200).json({ valid: true });
    } else {
      return res.status(401).json({
        valid: false,
        message:
          "Email not verified please verify your emai and login to access this page",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ valid: false, message: "Invalid or expired token" });
  }
};
