import express from 'express';
import dotenv from 'dotenv/config';
import bodyParser from 'body-parser';
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));