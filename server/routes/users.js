import express from 'express'
import "dotenv/config";
import { v4 as uuidv4 } from "uuid"; 
import User from '../models/Users.js'

const router = express.Router();

router.get("/auth/users", (req, res) => {
  User.find().then((users) => {
    res.send(users)
    console.log(users)
  }).catch(next)
})

router.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      userId: uuidv4(),
    });
    
    sendToken(user, 201, res);
    
  } catch (error) {
    res.status(400).json({ sucess: false, error: "User has already been registered" })
  }

});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).json({ success: false, error: "Please enter your email and password"})
  }

  try {
    const user = await User.findOne({email}).select("+password");
    if(!user) {
      res.status(404).json({success: false, error: "Invalid User"})
    }

    const passwordMatch = await user.matchPasswords(password);
    if(!passwordMatch) {
      res.status(404).json({success: false, error: "Invalid Password"})
    }

    sendToken(user, 201, res)
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }


})

router.put("/auth/users/:id", (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.userId}, req.body).then((user) => {
    User.findOne({ _id: req.params.userId }).then( (user) => {
      res.send(user);
    });
  })
})

router.delete("/auth/users/:id", (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId }).then(function (user) {
    res.send(user);
  });
})

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({success: true, token})
}

export default router;