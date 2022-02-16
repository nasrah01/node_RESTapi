import jwt from 'jsonwebtoken'
import User from "../models/Users.js";

const protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if(!token) {
    return res.status(401).json({ success: false, error: "Not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if(!user) {
      return res.status(404).json({ success: false, error: "User not found with this ID" });
    }

    req.user = user

    next();

  } catch (error) {
    return res.status(401).json({ success: false, error: "Not authorized to access this route" });
  }
}

export default protect