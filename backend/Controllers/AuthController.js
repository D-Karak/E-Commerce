require("dotenv").config();
const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
    try {
  const { name, email, password, role } = req.body;
  const existUser= await UserModel.findOne({email})
  console.log(existUser)
  if(existUser){
    return res.status(200).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: role || "Customer",
    });
    await user.save();
    // const token = jwt.sign({ email:user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    // res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const signIn = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    res.status(200).json({ message: "User logged in successfully", token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
     });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};



module.exports = { signUp, signIn };
