const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/blog.route");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://isway.netlify.app'];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true, // Include cookies and headers in requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
