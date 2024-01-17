const joi = require("joi");

const jobValidator = joi.object({
  title: joi.string().min(5).max(255).required(),
  description: joi.string().min(5).max(255).optional(),
  createAt: joi.date().default(Date.now()),
  lastUpdateAt: joi.date().default(Date.now()),
});

module.exports = validateJobMiddleWare;