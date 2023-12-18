const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema();

const JobApplicationModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  resume: {
    data: Buffer, // Store the file data as a buffer
    contentType: String,
  },
  coverLetter: {
    data: Buffer, // Store the file data as a buffer
    contentType: String,
  },
  applicationStatus: {
    //e.g., Submitted, Under Review, Rejected, Accepted)
    type: String,
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  jobListing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobListing", // Reference to the JobListing collection
  },
});

module.exports = mongoose.model("JobApplication", JobApplicationModel);
