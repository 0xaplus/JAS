const jobsApplicationRoute = require('express').Router();
const jobApplicationCtrller = require('../controllers/jobApplication.controller')

jobsApplicationRoute.get('/:jobListingId/applications', jobApplicationCtrller.getJobApplications);
jobsApplicationRoute.post('/applications', jobApplicationCtrller.createJobApplication);
jobsApplicationRoute.put('/:id', jobApplicationCtrller.updateJobApplication);
jobsApplicationRoute.delete('/:id', jobApplicationCtrller.deleteJobApplication);

module.exports = jobsApplicationRoute; 
