import jwt from "jsonwebtoken";
import userModel from "../modules/user.js";
import bcrypt from "bcryptjs";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User dosn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, "text", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser)
      return res.status(404).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(404).json({ message: "password must be same value" });
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await userModel.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashPassword,
    });
    const token = jwt.sign({ email, password, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
