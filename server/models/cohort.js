const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cohortSchema = new Schema({
  cohortSlug: { type: String, required: true },
  cohortName: { type: String, required: true },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: {
    type: String,
    enum: ["Part Time", "Full Time"],
  },
  campus: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },
  startDate: { type: Date },
  endDate: { type: Date },
  inProgress: { type: Boolean, Default: false },
  programManager: { type: String, Required: true },
  leadTeacher: { type: String, Required: true },
  totalHours: { type: Number, Default: 360 },
});
