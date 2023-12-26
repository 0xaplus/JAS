const applicationModel = require('../models/applicationsModel');
const jobModel = require('../models/jobsModel');
const { ObjectId } = require('mongoose').Types;

// File Uploads
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

//GET all job applications for a job by ID
async function getApplications(req, res) {
    try {
        const jobId = req.params.jobId;
        const foundJob = await jobModel.findById(jobId).populate('applications');

        if (!foundJob) {
            return res.status(404).send('Job not found');
        }

        const applications = foundJob.applications;
        res.status(200).send(applications);
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET application by ID
async function getApplicationByID(req, res) {
    try {
        const applicationId = req.params.applicationId;
        const foundJob = await applicationModel.findById(applicationId);
    
        if (!foundJob) {
            res.status(404).send('Application not found!');
            return
        };
    
        res.status(200).send(foundJob);
    } catch (error) {
        res.status(500).send(error)
    }
}

// CREATE a job application
async function createApplication(req, res) {
    try {
        const jobId = req.params.jobId;
        const foundJob = await jobModel.findById(jobId);

        if (!foundJob) {
            return res.status(404).send('Job not found');
        }

        // const newJobApplication = new applicationModel({ ...newApl, job: new ObjectId(jobId) });
        const uploadMiddleware = util.promisify(upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]));

        await uploadMiddleware(req, res); // Use await to properly handle the asynchronous upload operation

        const newApl = req.body;
        const resumeFile = req.files['resume'][0];
        const coverLetterFile = req.files['coverLetter'][0];
        console.log(req.files);

        const newJobApplication = new applicationModel({
            ...newApl,
            jobListing: new ObjectId(jobId),
            resume: {
                data: resumeFile.buffer,
                contentType: resumeFile.mimetype
            },
            coverLetter: {
                data: coverLetterFile.buffer,
                contentType: coverLetterFile.mimetype
            }
        });

        const savedApplication = await newJobApplication.save();
        foundJob.applications.push(savedApplication._id);
        foundJob.save();
        res.status(201).send(savedApplication);
    } catch (error) {
        res.status(500).send(error)
    }
};

// UPDATE application by  ID
async function updateApplicationByID(req, res) {
    try {
        const applicationId = req.params.applicationId;
        const updatedFields = req.body;
        const updatedApl = await applicationModel.findByIdAndUpdate(applicationId, updatedFields, { new: true });

        if (!updatedApl) {
            res.status(404).send('Application not found');
            return
        };

        res.status(200).send(updatedApl);
    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE application by  ID
async function deleteApplicationByID(req, res) {
    try {
        const id = req.params.applicationId;
        const check = await applicationModel.findByIdAndDelete(id)
        res.status(200).send('Application deleted successfully.');
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    getApplications, getApplicationByID,
    createApplication,
    updateApplicationByID,
    deleteApplicationByID,
}
