const express = require("express");
const { connectToMongoDB } = require("./config/db");
const jobsRoute = require("./routes/jobsRoutes");
const applicationRoute = require("./routes/applicationsRoutes");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
connectToMongoDB();

app.use(express.json());

// change to /api/v1/jobs later
app.use("/jobs", jobsRoute);
app.use("/jobs", applicationRoute);

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.listen(PORT, () => {
  console.log("Server is listening on PORT", PORT);
});
