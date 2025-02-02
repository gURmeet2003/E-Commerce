import { User } from "../../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const user_signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "field is empty", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "please signup then login", success: false });
    }

    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res
        .status(404)
        .json({ message: "password is invalid", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      user,
      token: token,
      message: "login successfull",
      success: true,
    });
  } catch (e) {
    console.log(e);

    return res
      .status(500)
      .json({ message: "error in server during signup", success: false });
  }
};
