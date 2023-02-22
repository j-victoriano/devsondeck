const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter job Title"]
    },

    salary: {
        type: String,
        required: [true, "Enter a salary for this position"]
    },

    description: {
        type: String,
        required: [true, "Enter description for this position"]
    },

    skills: {
        type: [String],
        required: false,
        maxLength: 5
    },

    type: {
        type: String,
        required: [true, "Please enter a type for this position"]
    },

    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }

}, {timestamps: true})

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;