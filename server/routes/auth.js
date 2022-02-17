import express from 'express'
import protect from '../middleware/userProtect.js'

const router = express.Router(); 

router.get("/", protect, (req, res) => {
  res.status(200).json({ sucess: true, data: "access authorized" });
});

export default router;