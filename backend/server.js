const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors")
const connectDB = require("./config/db");

//connect to the mongoDB database
connectDB();

PORT = process.env.PORT || 5000;

const app = express();

//allow cross origin
//allow the front end to make requests to the backend (from port:3000 to port:5000)
app.use(cors())


//middleware for using and reading json in the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.json({ message: "Hello", success: true });
});

//ROUTES
app.use("/api/users", require("./routes/userRoutes"));

//middlewares
app.use(errorHandler);

//CREATE SERVER
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
