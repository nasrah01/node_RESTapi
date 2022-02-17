import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import usersRoutes from "./routes/users.js"
import privateRoutes from './routes/auth.js'

const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const connectDB = async() => {
  await mongoose.connect(process.env.DATABASE_URI);
  console.log('MongoDB connected')
}
connectDB()

app.get('/', (req, res) => {
  res.send('hello world');
})

app.use("/", usersRoutes);
app.use("/auth/private", privateRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({error: err.message});
})

app.listen(PORT || 4000, () => console.log(`Server on http://localhost:${PORT}`));