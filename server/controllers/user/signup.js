import { User } from "../../models/user_model.js";
import bcrypt from "bcrypt";

export const user_signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ message: "field is empty", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ message: "user exists please login", success: false });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashpassword }).save();
    return res
      .status(200)
      .json({ message: "user signup successfull", success: true });
  } catch (e) {
    console.log(e);

    return res
      .status(500)
      .json({ message: "error in server during signup", success: false });
  }
};
