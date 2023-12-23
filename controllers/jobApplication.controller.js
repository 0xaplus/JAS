const jobApplicationModel = require('../models/jobApplicationModel');
const { ObjectId } = require('mongoose').Types;

//  READ all jobs application made to a particular Job
function getAllJobsApplication(req, res) {
    const id = req.params.id;
    
    jobApplicationModel.findById(id)
        .then((aps) => { // applications
        aps ? res.status(200).send(aps) : res.status(404).send({ message: 'Job application not found!' });
        })
        .catch((err) => {
        res.status(500).send(err);
        });
};

// CREATE a job application
function createJobApplication(req, res) {
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
};

// UPDATE job application
function updateJobApplication(req, res) {
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
};

// DELETE job application
function deleteJobApplication(req, res) {
    const id = req.body._id;

    jobApplicationModel
        .findByIdAndDelete(id)
        .then(() => {
            res.status(204);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

module.exports = {
    getAllJobsApplication, 
    createJobApplication,
    updateJobApplication,
    deleteJobApplication
}
