const express = require('express');
const { ObjectId } = require('mongoose').Types;
const jobApplicationModel = require('../models/jobApplicationModel');
const jobListingModel = require('../models/jobsModel')

const jobsApplicationRoute = express.Router();

// Authorisation

//  READ all jobs application made to a particular Job
jobsApplicationRoute.get('/:id', (req, res) => {
  const id = req.params.id;

  jobApplicationModel.findById(id)
    .then((aps) => { // applications
      aps ? res.status(200).send(aps) : res.status(404).send({ message: 'Job application not found!' });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// CREATE a job application
jobsApplicationRoute.post('/:jobListingId', (req, res) => {
    const jobListingId = req.params.jobListingId;
    const newAp = req.body;
    const newJobApplication = new jobApplicationModel({ ...newAp, jobListing: new ObjectId(jobListingId) });
    
    jobListingModel.findById(jobListingId)
     .then((job) => {
        if (!job) {
            res.status(404).send({message: "Job not found!"});
            return;
        } else {

            jobApplicationModel.create(newJobApplication)
                .then((createdJobApplication) => {
                    res.status(201).send(createdJobApplication);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        };
     })
     .catch(() => {
        res.status(404).send('Not found!')
     })
});


// UPDATE job application
jobsApplicationRoute.put('/:id', (req, res) => {
    const id = req.params.id;
    const newAp = req.body;
    const updatedApplication = { ...newAp, jobListing: new ObjectId(id)};

    jobApplicationModel
        .findByIdAndUpdate(id, updatedApplication, {new: true})
        .then((updatedApplication) => {
            res.status(200).send(updatedApplication);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

// DELETE job application
jobsApplicationRoute.delete('/:id', (req, res) => {
    const id = req.body._id;

    jobApplicationModel
        .findByIdAndDelete(id)
        .then(() => {
            res.status(204);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
});

module.exports = jobsApplicationRoute; 
