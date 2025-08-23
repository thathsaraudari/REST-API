const { Router } = require("express");
const router = express.Router();
const CohortModel = require("../models/cohort.js");

router.post("/create", async (req, res) => {
  try {
    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body
    const programArr = program.split(",") //convert comma-separated strings into arrays
    const formatArr = format.split(",")
    const campusArr = campus.split(",")

    const created = await CohortModel.create({ 
        cohortSlug, 
        cohortName, 
        programArr, 
        formatArr, 
        campusArr, 
        startDate, 
        endDate, 
        inProgress, 
        programManager, 
        leadTeacher, 
        totalHours 
    })

    return res.status(201).json({ msg: "Cohort registered", created })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

//GET all cohorts from MongoDB
router.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await CohortModel.find(); // Retrieves all documents from the Cohorts collection.
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get cohorts from the database",
      error: err.message,
    });
  }
});


//get one cohort from MongoDB
router.get("/api/cohorts/:id", async (req, res) => {
  try {
    const { id } = req.params
    const cohort = await CohortModel.findById(id)

    return res.status(200).json(cohort)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

//update cohort
router.patch("/api/cohorts/:id", async (req, res) => {
  try {
    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body
    const { id } = req.params
    const programArr = program.split(",") //convert comma-separated strings into arrays
    const formatArr = format.split(",")
    const campusArr = campus.split(",")

    const updated = await CohortModel.findByIdAndUpdate(id, { 
        cohortSlug, 
        cohortName, 
        programArr, 
        formatArr, 
        campusArr, 
        startDate, 
        endDate, 
        inProgress, 
        programManager, 
        leadTeacher, 
        totalHours 
    })

    return res.status(201).json({ msg: "Cohort registered", updated })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})


router.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const { id } = req.params
    const cohortDeleted = await CohortModel.findByIdAndDelete(id)

    return res.status(200).json({ msg: "Cohort deleted" })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

module.exports = router;
