const jobsModel = require('../models/jobsModel');

// READ
async function getAllJobs(req, res) {
    try {
      const allJobs = await jobsModel.find({})
      res.status(200).send(allJobs);
    } catch (error) {
      res.status(500).send(error);
    }
};

// READ by Id
async function getJobByID(req, res) {
    try {
      const id = req.params.id;
      const foundJob = await jobsModel.findById(id);
  
      if (!foundJob) {
        res.status(404).send({message: "Job Not Found."});
        return;
      };
  
      res.status(200).send(foundJob);
    } catch (error) {
      res.status(500).send(error);
    }
};

// CREATE
async function addJob(req, res) {
    const newJob = req.body;
  
    try {
      // Checks if the newJob sent is empty
      if(Object.keys(newJob).length === 0) {
        res.status(400).send({ message: "Bad Request - Request body is missing or empty" });
        return;
      };
  
      const jobCreated = await jobsModel.create(newJob);
      res.status(201).send(jobCreated);
    } catch (error) {
      res.status(500).send(error);
    };
};

// UPDATE
async function updateJobByID(req, res) {
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
};

// DELETE
async function deleteJobByID(req, res) {
    try {
      const id = req.params.id;
  
      //delete job by id
      const jobToDel = await jobsModel.findByIdAndDelete(id);
      
      if (!jobToDel) {
        return res.status(404).send({ message: "Job not found" });
      };
  
      res.status(200).send({
        message: "Deleted successfully"
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
};

module.exports = {
    getAllJobs,
    getJobByID,
    addJob,
    updateJobByID,
    deleteJobByID
};