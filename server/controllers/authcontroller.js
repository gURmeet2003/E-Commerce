import User from "../models/usermodels.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ success: "false", message: "field is empty" });
    }
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      const hashpassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashpassword });
      res
        .status(200)
        .json({ success: "true", message: "user registered successfully" });
    } else {
      res.status(404).json({
        success: "false",
        message: "user already exist with this email",
      });
    }
  } catch (e) {
    console.log(e);

    res.status(500).json({ success: "false", message: "server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: "false", message: "field is empty" });
    }
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json({
          success: "false",
          message: "password invalid",
        });
      }
      res
        .status(200)
        .json({ success: "true", message: "user loggedin successfully" });
    } else {
      res.status(404).json({
        success: "false",
        message: "please register with this email",
      });
    }
  } catch (e) {
    console.log(e);

    res.status(500).json({ success: "false", message: "server error" });
  }
};
