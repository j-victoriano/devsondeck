const JobController = require("../controllers/jobs.controller")
const {authenticateCompany} = require("../config/jwt.config")


module.exports = (app) => {
    app.get("/api/jobs/allJobs", JobController.findAllJobs)

    app.get("/api/jobs/:id", JobController.findOneJob)

    app.post("/api/jobs/create",authenticateCompany, JobController.createNewJob)

    app.get("/api/jobsbycompany/:name", authenticateCompany, JobController.findAllJobsByCompany)

    app.delete("/api/jobs/:id", JobController.deleteJob)
}