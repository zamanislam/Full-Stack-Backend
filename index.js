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
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true, // Include cookies and auth headers
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

// Error handler for CORS issues (optional, for debugging)
app.use((err, req, res, next) => {
  if (err.message === 'CORS not allowed from this origin') {
    res.status(403).json({ error: 'CORS not allowed' });
  } else {
    next(err);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connect();
  console.log("Listening to server on port " + PORT);
});
