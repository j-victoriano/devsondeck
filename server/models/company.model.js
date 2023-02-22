const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CompanySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter a company name."]
    },
    email: {
        type: String,
        required: [true, "Please enter a company email"]
    },
    address: {
        street: {
            type: String,
            required: [true, "Please enter a valid street address"]
        },
        city: {
            type: String,
            required: [true, "Please enter a city"]
        },
        state: {
            type: String,
            required: [true, "Please select a state"]
        }
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, {timestamps: true })

CompanySchema.virtual("confirmPassword")
    .get(()=> this._confirmPassword)
    .set((value)=> this._confirmPassword = value)

CompanySchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords do not match!");
        console.log("Passwords do not match!");
    }
    next();
})

CompanySchema.pre("save", function (next) {
    console.log("In pre-save --------------------------------");
    bcrypt.hash(this.password, 10)
        .then((hashedpw)=> {
            this.password = hashedpw
            next();
        })
})

const Company = mongoose.model("Company", CompanySchema);

module.exports =  Company;