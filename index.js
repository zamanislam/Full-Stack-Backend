const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/blog.route");
const app = express();
const cors=require("cors")

app.use(cors({ origin: 'http://localhost:5173' }));


require("dotenv").config();
app.use(express.json()); // Body parsing

app.use("/users", userRouter);
app.use("/products", productRouter)

app.get("/health", (req, res) => {
    res.send("OK!")
})

const PORT = process.env.PORT

app.listen(PORT, async () => {
    await connect();
    console.log("Listening to server on !"+PORT)
})