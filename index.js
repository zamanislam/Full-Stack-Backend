const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/blog.route");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://isway.netlify.app'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
 
}));

app.use(express.json()); // Body parsing

app.use("/users", userRouter);
app.use("/products", productRouter);

app.get("/health", (req, res) => {
  res.send("OK!");
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connect();
  console.log("Listening to server on port " + PORT);
});
