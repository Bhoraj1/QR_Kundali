import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import SignUpModel from "../models/signupSchema.js";
import {OAuth2Client} from "google-auth-library";
import bcrypt from "bcrypt";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "bhorajmalla8@gmail.com",
    pass: "tigy nloo hcsn lyom",
  },
});

export const SendVerificationCode = async (email, VerificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"QR KUNDALI 👻" <bhorajmalla8@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your email ✔", // Subject line
      text: "Verify your email?", // plain text body
      html: VerificationCode, // html body
    });
    // console.log("Email send success" ,response)
  } catch (error) {
    console.log(error);
  }}


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GoogleAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Get payload from the ticket
    const payload = ticket.getPayload();

    // Destructure the payload
    const { email_verified, email, name } = payload;

    if (email_verified) {
      // Check if the user already exists in the database
      const user = await SignUpModel.findOne({ email });

      if (user) {
        // User exists, generate a JWT token
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const { _id, username, email } = user;
        return res.json({
          token,
          user: { _id, username, email },
        });
      } else {
        // User does not exist, create a new user
        let Newpassword = process.env.JWT_SECRET + email; // Generate a password
        const password = await bcrypt.hash(Newpassword, 10);
        const newUser = new SignUpModel({ username: name, email, password });


        // Save the new user to the database
        const savedUser = await newUser.save();

        // Generate a token for the newly created user
        const token = jwt.sign(
          { _id: savedUser._id }, 
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const { _id, username } = savedUser;
        return res.json({
          token,
          user: { _id, username, email },
        });
      }
    } else {
      return res.status(401).json({
        message: "Google login failed. Email not verified.",
      });
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({
      message: "Error during Google login",
    });
  }
};
