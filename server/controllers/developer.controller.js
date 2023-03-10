const Developer = require("../models/developer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    register: (req,res)=>{
        const dev = new Developer(req.body)
        console.log("registering dev");
        dev.save()
            .then((newDev)=>{
                console.log(newDev)
                console.log("Successfully registered!");
                res.json({
                    successMessage: "Welcome on board Dev!",
                    dev: newDev
                });
            })
            .catch((err)=>{
                console.log("Registration failed");
                res.status(400).json(err)
            })
    },

    login: (req, res)=>{
        Developer.findOne({email: req.body.email})
            .then((devRecord)=>{
                //Check if there is a dev w that email, if not
                if(devRecord === null){
                    res.status(400).json({message: "Invalid login attempt! Please enter your information again."})
                }
                else{
                    //Checking if passwords match
                    bcrypt.compare(req.body.password, devRecord.password)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                                console.log("Password is valid! Now then---->");
                                res.cookie(
                                    "devtoken",
                                    jwt.sign(
                                        {
                                            id: devRecord._id,
                                            email: devRecord.email,
                                            firstname: devRecord.firstName
                                        },
                                        `${process.env.JWT_SECRET}`
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 900000)
                                    }
                                ).json({
                                    message: "Success!",
                                    devLoggedIn: devRecord.firstName,
                                    devId: devRecord._id
                                });
                            }
                            //If password is not valid
                            else{
                                res.status(400).json({message: "Invalid login attempt!"})
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({message: "Something did not go right!!"})
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({message: "Hmm what went this time?"})
            })
    },

    logout: (req, res) => {
        console.log("Logging out...");
        res.clearCookie("devtoken");
        res.json({
            message: "Successfully logged out! :)"
        });
    },

    getLoggedInDev: (req, res) => {
        console.log("Getting logged in dev...");
        Developer.findOne({_id: req.jwtpayload.id})
            .then((dev)=>{
                console.log(dev);
                res.json(dev)
            })
            .catch((err)=> {
                console.log(err);
            })
    },

    findAllDevs: (req, res)=> {
        Developer.find()
            .then((allDevs)=> {
                res.json(allDevs);
            })
            .catch((err)=> {
                console.log("Couldn't find all Developers");
                res.json({message: "Something went wrong when finding all Developer.", error: err})
            })
    },

    getOneDev: (req, res) => {
        console.log("One developer:")
        Developer.findOne({_id: req.params.id})
            .then(oneDev => {
                console.log(oneDev);
                res.json(oneDev)
            })
            .catch((err)=> {
                console.log("Couldnt find the one dev...");
                res.json({message: "Something went wrong finding one dev...", error: err})
            })
    },

    updateDev: (req, res) => {
        Developer.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
        )
            .then(updateDev => res.json(updateDev))
            .catch(err => res.json(err));
    },
    
    deleteDev: (req, res) => {
        Developer.deleteOne({_id: req.params.id})
            .then((deletedDev)=> {
                console.log('Found a job!');
                res.json(deletedDev)
            })
            .catch((err)=> {
                console.log('Deleted dev failed!');
                res.json({message: "couldn't delete dev!", error: err});
            })
    }

}