const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/blog.route");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Enable CORS for all origins
app.use(cors({
  origin: "*", // Allow all origins
  credentials: false, // Set to true if you need cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Body parser middleware
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/products", productRouter);

// Health check route
app.get("/health", (req, res) => {
  res.send("OK!");
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connect();
  console.log("Listening to server on port " + PORT);
});
