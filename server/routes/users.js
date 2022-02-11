import express, { application } from 'express'
import { v4 as uuidv4 } from "uuid"; 
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const router = express.Router();

router.post("/auth/users", async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userId: uuidv4(),
    });
    
    res.json({ status: 200 });
  } catch (error) {
    res.json({status: 'error'})
  }

});

router.post('/auth/login', async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    })

    if(user) {
      const token = jwt.sign({
        name: user.name,
        email: user.email
      }, '54321')
      
      return res.json({status: 'ok', user: token})
    } else {
      return res.json({status: 'error', user: false})
    }
})




export default router;