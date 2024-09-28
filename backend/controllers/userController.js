import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    // Check if the password is correct or not
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password is correct, create a token and return it to the user
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    } else {
      const token = createToken(user._id);
      res.json({
        token,
        success: true,
        message: "User logged in successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password should be at least 8 characters long and should contain at least one uppercase letter, one lowercase letter, one number and one special character",
        success: false,
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ token, success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

// Route for admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token,
        success: true,
        message: "Admin logged in successfully",
      });
    } else {
      res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

export { loginUser, registerUser, adminLogin };
