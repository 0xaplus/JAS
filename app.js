const express = require("express");
const { connectToMongoDB } = require("./config/db");
const jobsRoute = require("./routes/jobsRoutes");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
connectToMongoDB();

app.use(express.json());
app.use("/jobs", jobsRoute);

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.listen(PORT, () => {
  console.log("Server is listening on PORT", PORT);
});
