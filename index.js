const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

// mongoose.connect('mongodb://localhost:27017/myapp');
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connected ding ding" + err.message);
  });

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// app.get("/", (req, res) => {
//   res.send("welcome to HomePage!!");
// });

// app.get("/users", (req, res) => {
//   res.send("welcome to user Page!!");
// });

app.listen(8800, () => {
  console.log("backend server is runningggg!!");
});
