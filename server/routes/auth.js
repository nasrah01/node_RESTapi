import express from 'express'
import pretect from '../middleware/userProtect.js'

const router = express.Router(); 

router.get("/auth/private", (req, res) => {
  res.status(200).json({sucess: true, data: "access authorized"})
});

export default router;