const Job = require('../models/jobs.model');
const jwt = require('jsonwebtoken');
const Company = require('../models/company.model');

module.exports = {

    findAllJobs: (req, res) => {
        Job.find()
            .populate("createdby", "email")
            .then((allJobs) => {
                console.log(allJobs);
                res.json(allJobs);
            })
            .catch((err) => {
                console.log("Couldn't find all jobs");
                res.json({ message: "Something went wrong finding jobs.", error: err });
            })
    },

    createNewJob: (req, res) => {
        const newJob = new Job(req.body);
        const decodedJWT = jwt.decode(req.cookies.companytoken, {
            complete: true
        })
        newJob.createdby = decodedJWT.payload.id;
        newJob.save()
            .then((newJob) => {
                console.log("Creating new job with logged in company")
                console.log(newJob);
                res.json(newJob);
            })
            .catch((error) => {
                console.log("Something went wrong creating new job");
                res.status(400).json(error);
            })
    },

    findOneJob: (req, res) => {
        Job.findOne({ _id: req.params.id })
            .then((oneJob) => {
                console.log(oneJob);
                res.json(oneJob);
            })
            .catch((err) => {
                console.log(err);
                res.json({ message: "Something went wrong finding the one job", error: err })
            })
    },

    deleteJob: (req, res) => {
        Job.deleteOne({ _id: req.params.id })
            .then((deletedJob) => {
                console.log(deletedJob);
                res.json(deletedJob)
            })
            .catch((err) => {
                console.log("DeleteJob failed");
                res.json({ message: "Something went wrong deleting this job", error: err })
            })
    },

    findAllJobsByCompany: (req, res) => {
        if (req.jwtpayload.name !== req.params.name) {
            console.log(req.jwtpayload.name);
            console.log(req.params.name);
            console.log("Not the company!");
            Company.findOne({ name: req.params.name })
                .then((companyNotLoggedIn) => {
                    Job.find({createdby: companyNotLoggedIn._id})
                        .populate("createdby", "name")
                        .then((allJobsFromCompany) => {
                            console.log("All jobs from company");
                            res.json(allJobsFromCompany);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else {
            console.log("Current user!")
            console.log("req.jwtpayload.id:", req.jwtpayload.id)
            Job.find({ createdby: req.jwtpayload.id })
                .populate("createdby", "name")
                .then((allJobsFromLoggedInCompany) => {
                    console.log("All jobs from company");
                    res.json(allJobsFromLoggedInCompany);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }

    }

}