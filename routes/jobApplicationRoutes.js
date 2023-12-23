const jobsApplicationRoute = require('express').Router();
const jobApplicationCtrller = require('../controllers/jobApplication.controller')

jobsApplicationRoute.get('/:id', jobApplicationCtrller.getAllJobsApplication);
jobsApplicationRoute.post('/:jobListingId', jobApplicationCtrller.createJobApplication);
jobsApplicationRoute.put('/:id', jobApplicationCtrller.updateJobApplication);
jobsApplicationRoute.delete('/:id', jobApplicationCtrller.deleteJobApplication);

module.exports = jobsApplicationRoute; 
