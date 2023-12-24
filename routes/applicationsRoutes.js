const jobsApplicationRoute = require('express').Router();
const jobApplicationCtrller = require('../controllers/applications.controller')

jobsApplicationRoute.get('/:jobListingId/applications', jobApplicationCtrller.getJobApplications);
jobsApplicationRoute.post('/:jobListingId/applications', jobApplicationCtrller.createJobApplication);
jobsApplicationRoute.put('/:jobListingId/applications/:applicationId', jobApplicationCtrller.updateJobApplication);
jobsApplicationRoute.delete('/:id', jobApplicationCtrller.deleteJobApplication);

module.exports = jobsApplicationRoute; 
