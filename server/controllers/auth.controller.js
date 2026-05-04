import admin from "../config/firebaseAdmin.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    // 🔥 verify firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    const { name, email, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        photo: picture
      });
    }

    const jwtToken = createToken(user._id);

    // 🔥 COOKIE SET
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Google Auth Failed" });
  }
};
