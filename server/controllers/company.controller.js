const Company = require('../models/company.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register: (req, res)=> {
        const company = new Company(req.body)
        console.log("Registering company.....");
        company.save()
            .then((newCompany)=>{
                console.log(newCompany);
                console.log("Successfully registered company!");
                res.json({
                    successMessage: "Successfully registered company",
                    company: newCompany
                });
            })
            .catch((err)=> {
                console.log("Registration failed.....");
                res.status(400).json(err)
            })
    },

    login: (req, res) => {
        Company.findOne({email: req.body.email})
            .then((companyRecord)=> {
                if(companyRecord === null) {
                    res.status(400).json({message: "Invalid login attempt! Please enter your information again."})
                }
                else {
                    bcrypt.compare(req.body.password, companyRecord.password)
                        .then((isPasswordValid)=> {
                            if(isPasswordValid){
                                console.log("Password is valid!-------------->");
                                res.cookie(
                                    "companytoken",
                                    jwt.sign(
                                        {
                                            id: companyRecord._id,
                                            name: companyRecord.name,
                                            email: companyRecord.email,
                                        },
                                        `${process.env.JWT_SECRET}`
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 900000)
                                    }
                                ).json({
                                    message: "Successfully logged in!",
                                    companyLoggedIn: companyRecord.name,
                                    companyId: companyRecord._id
                                });
                            }
                            else {
                                res.status(400).json({message: "Invalid login credentials. Please try again."});
                            }
                        })
                        .catch((err)=> {
                            console.log(err);
                            res.status(400).json({message: "Hmmm something went wrong,....", error: err});
                        })
                }
            })
            .catch((err)=> {
                console.log(err);
                res.status(400).json({message: "Hmmm something went wrong...?", error: err});
            })
    },

    logout: (req, res) => {
        console.log("Logging out...");
        res.clearCookie("companytoken");
        res.json({
            message:"Successfully logged out! :p"
        });
    },

    getLoggedInCompany: (req, res) => {
        console.log("Getting logged in company....");
        Company.findOne({_id:req.jwtpayload.id})
            .then((company)=> {
                console.log(company);
                res.json(company);
            })
            .catch((err)=> {
                console.log("Couldn't get logged in company....");
                console.log(err);
            })
    },

    findAllCompanies: (req, res) => {
        Company.find()
            .then((allCompanies) => {
                res.json(allCompanies);
            })
            .catch((err) => {
                console.log("Couldn't find allCompanies");
                res.json({message: "Something went wrong finding all the companies.", error: err});
            })
    }

}