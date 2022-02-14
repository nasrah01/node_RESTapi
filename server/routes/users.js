import express from 'express'
import { v4 as uuidv4 } from "uuid"; 
import jwt from 'jsonwebtoken'
import User from '../models/Users.js'
import "dotenv/config";

const router = express.Router();

router.get("/auth/users", (req, res, next) => {
  User.find().then((users) => {
    res.send(users)
    console.log(users)
  }).catch(next)
})

router.post("/auth/register", async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userId: uuidv4(),
    });
    
    res.status(201).json({
      sucess: true,
      user
    })
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message
    })
  }

});

router.post('/auth/login', async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    }).lean();

    // if not user if(!user) {json status user not found}

    //bcypt password then check the password

    if(user) {
      const accessToken = jwt.sign({
        name: user.name,
        email: user.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'5m'} 
      )

      const refreshToken = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
      res.json({status: 'ok', user: accessToken})
    } else {
      res.json({status: 'error', user: false})
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

export default router;