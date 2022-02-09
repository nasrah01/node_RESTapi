import express from 'express'
import { v4 as uuidv4 } from "uuid"; 

const router = express.Router();

let users = [];

router.post("/api/users", (req, res) => {
  console.log(req.body);

  res.json({ message: "done" });

  const user = req.body;

  users.push({ ...user, id: uuidv4() });
  res.send(`${user.name} has been added to the user list`);
});

router.get("/", (req, res) => {
  console.log(users);
  res.send(users);
});


export default router;