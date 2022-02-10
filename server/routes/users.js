import express, { application } from 'express'
import { v4 as uuidv4 } from "uuid"; 
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
    
    res.json({ message: `${user.name} has been added to the user list` });
  } catch (error) {
    res.json({status: 'error'})
  }

});

router.post('/auth/login', async (req, res) => {
  try {
    await User.findOne({
      email: req.body.email,
      password: req.body.password
    })
    res.json({message: 'found'})
  } catch (error) {
    res.json({message: 'error', error: 'email error'})
  }
})




export default router;