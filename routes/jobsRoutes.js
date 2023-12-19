const express = require("express");
const jobsController = require("../controllers/jobs.controller");

const jobsRoute = express.Router();

jobsRoute.get("/", jobsController.getAllJobs);
jobsRoute.get("/:id", jobsController.getJobByID);
jobsRoute.post("/new", jobsController.addJob);
jobsRoute.put("/:id", jobsController.updateJobByID);
jobsRoute.delete("/:id", jobsController.deleteJobByID);

module.exports = jobsRoute;
