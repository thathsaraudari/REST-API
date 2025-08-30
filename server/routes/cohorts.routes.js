const { Router } = require("express");
const router = Router();
const CohortModel = require("../models/cohort.js");

router.post("/", async (req, res) => {
  try {
    const cohortData = req.body;

    const createdCohort = await CohortModel.create(cohortData);

    return res.status(201).json({ msg: "Cohort registered", created: createdCohort })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

//GET all cohorts from MongoDB
router.get("/", async (req, res) => {
  try {
    const allCohorts = await CohortModel.find(); // Retrieves all documents from the Cohorts collection.
    res.json( { msg: "Get all cohorts", cohorts: allCohorts });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get cohorts from the database",
      error: err.message,
    });
  }
});


//get one cohort from MongoDB
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const oneCohort = await CohortModel.findById(id)

    return res.status(200).json({ msg: "Get one cohort", cohort: oneCohort })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

//update cohort
router.patch("/:id", async (req, res) => {
  try {
    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body
    const { id } = req.params
    const programArr = program ? program.split(",") : [] //convert comma-separated strings into arrays
    const formatArr = format ? format.split(",") : []
    const campusArr = campus ? campus.split(",") : []

    const updatedCohort = await CohortModel.findByIdAndUpdate(id, { 
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
    },
    { new: true }
  )


    return res.status(201).json({ msg: "Cohort registered", updated: updatedCohort })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deletedCohort = await CohortModel.findByIdAndDelete(id)

    return res.status(200).json({ msg: "Cohort deleted", cohort: deletedCohort })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

module.exports = router;
