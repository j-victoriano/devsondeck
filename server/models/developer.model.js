const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DeveloperSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "Please enter a first name"]
    },

    lastName: {
        type: String,
        required: [true, "Please enter a last name"]
    },

    email: {
        type: String,
        required: [true, "Email address is required"]
    },

    homeaddress: {
        address: {
            type: String,
            required: [true, "Please enter an address"]
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

    biography: {
        type: String,
        required: [false]
    },

    skills: {
        type: String,
        required: [false],
    },

    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"]
    }

}, { timestamps: true })

DeveloperSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value)

DeveloperSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords must match!")
        console.log("Passwords don't match!")
    }
    next()
})

DeveloperSchema.pre("save", function (next) {
    console.log("In pre-save currently");
    bcrypt.hash(this.password, 10)
        .then((hashedpw) => {
            this.password = hashedpw;
            next();
        })
})

const Developer = mongoose.model("Dev", DeveloperSchema);

module.exports = Developer;