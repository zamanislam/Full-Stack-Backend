const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/blog.route");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://zamway.netlify.app'];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json());

// Routes
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
