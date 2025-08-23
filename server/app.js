const connectDB = require("./config/db.config.js");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cohortRoutes = require("./routes/cohorts.routes.js")
const studentRoutes = require("./routes/students.routes.js");
const PORT = 5005;
//const connectDB = require("./config/db.config");

//IMPORT MODELS
//const Cohort = require("./models/cohort.js");
const Student = require("./models/students.js");



//INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

//MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//IMPORT ROUTES
app.use("/api/cohort", cohortRoutes);
app.use("/api/students", studentRoutes);


//GET all students from MongoDB
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort"); // .populate("cohort") brings the data of the related Cohort.
    res.json(students);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get students from the database",
      error: err.message,
    });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB();
});
