const applicationRoute = require('express').Router();
const applicationCtrller = require('../controllers/applications.controller')

applicationRoute.get('/:jobId/applications', applicationCtrller.getApplications);
applicationRoute.get('/applications/:applicationId', applicationCtrller.getApplicationByID);
applicationRoute.post('/:jobId/apply', applicationCtrller.createApplication);
applicationRoute.put('/applications/:applicationId', applicationCtrller.updateApplicationByID);
applicationRoute.delete('/applications/:applicationId', applicationCtrller.deleteApplicationByID);

module.exports = applicationRoute; 
