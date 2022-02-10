import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import usersRoutes from "./routes/users.js"
import cors from "cors";
import mongoose from 'mongoose'

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URI);
app.use("/", usersRoutes);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));