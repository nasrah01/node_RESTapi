import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 6,
    select: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "1d"}
  );
};

export default mongoose.model("User-data", User);
