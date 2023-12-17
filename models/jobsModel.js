const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobListingsModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  company: String,
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobListing", JobListingsModel);
