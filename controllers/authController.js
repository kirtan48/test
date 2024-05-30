const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    //console.log(req.body);
    const { userName, email, password, phone, address } = req.body;
    if (!userName || !email || !password || !phone || !address) {
      res.status(500).send({
        success: false,
        message: "Please provide all  fields",
      });
    }
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(500).send({
        success: false,
        message: "User already Exist",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registereed",
      user,
    });
  } catch (error) {
    console.log(`error in Auth APi ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "email or password can't be empty",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credential",
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfull",
      token,
      user,
    });
  } catch (error) {
    console.log(`error in Login APi ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in login auth API",
      error,
    });
  }
};
module.exports = { registerController, loginController };
