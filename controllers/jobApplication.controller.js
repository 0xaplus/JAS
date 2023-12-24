const jobApplicationModel = require('../models/jobApplicationModel');
const jobListingModel = require('../models/jobsModel')
const { ObjectId } = require('mongoose').Types;

//READ all job applications for a job by ID
async function getJobApplications(req, res) {
    try {
        const jobListingId = req.params.jobListingId;
        const foundJob = await jobListingModel.findById(jobListingId).populate('applications');

        if (!foundJob) {
            return res.status(404).send('Job not found');
        }

        const applications = foundJob.applications;
        res.status(200).send(applications);
    } catch (error) {
        res.status(500).send(error);
    }
};

// CREATE a job application
async function createJobApplication(req, res) {
    try {
        const jobListingId = req.params.jobListingId;
        const foundJob = await jobListingModel.findById(jobListingId);

        if (!foundJob) {
            return res.status(404).send('Job not found');
        }

        const newApl = req.body;
        const newJobApplication = new jobApplicationModel({ ...newApl, jobListing: new ObjectId(jobListingId) });
        
        const savedApplication = await newJobApplication.save();
        foundJob.applications.push(savedApplication._id);
        foundJob.save();

        res.status(201).send(savedApplication);
    } catch (error) {
        res.status(500).send(error)
    }
};

// UPDATE job application
async function updateJobApplication(req, res) {
    try {
        const jobListingId = req.params.jobListingId;
        const applicationId = req.params.applicationId;
        const updatedFields = req.body; // Assuming req.body contains the fields to be updated

        const result = await jobListingModel.updateOne(
            { _id: jobListingId, "applications._id": applicationId },
            { $set: { "applications.$": updatedFields } }
        );

        if (result.nModified === 1) {
            res.status(200).send('Application updated successfully');
        } else {
            res.status(404).send('Job listing or application not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
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
    getJobApplications, 
    createJobApplication,
    updateJobApplication,
    deleteJobApplication,
    
}
