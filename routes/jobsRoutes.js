const express = require("express");
const jobsModel = require("../models/jobsModel");

const jobsRoute = express.Router();

//READ
jobsRoute.get("/", (req, res) => {
  // return all jobs in DB
  jobsModel
    .find({})
    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//READ by Id
jobsRoute.get('/:id', (req, res) => {
    const id = req.params.id;

    jobsModel.findById(id)
        .then((job) => {
            res.status(200).send(job);
        })
        .catch((err) => {
            res.status(404).send({message: "Not Found.", err});
        });
})

//CREATE
jobsRoute.post("/new", (req, res) => {
  const newJob = req.body;

  //create new job in DB
  jobsModel
    .create(newJob)
    .then((newJob) => {
      res.status(201).send(newJob);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

//UPDATE
jobsRoute.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const job = req.body; // Job to update with

    const updatedJob = await jobsModel.findByIdAndUpdate(id, job, { new: true });

    if (!updatedJob) {
      return res.status(404).send({ message: "Job not found" });
    };

    res.status(200).send(updatedJob);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// DELETE
jobsRoute.delete("/:id", (req, res) => {
  const id = req.params.id;

  //delete job by id
  jobsModel
    .findByIdAndDelete(id) //{ new: true} makes the res.send return the updated job
    .then(() => {
      res.status(200).send({
        message: "Deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = jobsRoute;
