import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Identify from "../models/Identify.js";
import sgMail from "@sendgrid/mail";

class AuthController {
  constructor() {
    this.userModel = new User();
    this.identifyModel = new Identify();
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await this.userModel.findByUsername(username);
      
      if (!user) return res.status(400).json({ message: "Incorrect username or password" });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return res.status(400).json({ message: "Incorrect username or password" });

      const token = jwt.sign(
        {
          id: user.id,
          username: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.name,
          email: user.email,
          roleId: user.roleId,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Login failed. Please try again later" });
    }
  }

  async register(req, res) {
    try {
      const saltRounds = 10;
      const { username, password, email } = req.body;

      const userExists = await this.userModel.findByUsername(username);

      if (userExists) return res.status(409).json({ message: "User already exists" });

      const hashPassword = await bcrypt.hash(password, saltRounds);
      const newData = {
        username,
        email,
        password: hashPassword,
      };

      await this.userModel.create(newData);
      return res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ message: "Registration failed. Please try again later" });
    }
  }

  async postIdentify(req, res) {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const { email } = req.body;
      const idCode = Math.floor(100000 + Math.random() * 900000).toString();
      await this.identifyModel.create(email, idCode); // add email and idCode into db
      const msg = {
        to: email,
        from: process.env.URL_EMAIL, // email sender
        subject: "Verification code for password reset",
        text: `Your verification code is: ${idCode}`,
      };
      await sgMail.send(msg); // Send email
      // Delete code after 30s
      setTimeout(async () => {
        try {
          await this.identifyModel.deleteById(idCode);
        } catch (error) {
          console.log("Error:", error.message);
        }
      }, 30000);
      return res.status(201).json({ message: "Verification code sent successfully" });
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ message: "Failed to send verification code" });
    }
  }
}

export default AuthController;
