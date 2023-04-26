const userModel = require("../model/userModel.js");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



const createUser = async function(req,res){
    try{
        let data = req.body
        const {name,email ,password} = data
        const bcryptPassword = await bcrypt.hash(password, 10)
        console.log(bcryptPassword)
        data.password = bcryptPassword

        let user = await userModel.create(data)
        return res.send({msg:"success", data: user})

    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}


const login = async function (req, res) {
    
    try {
        let { email, password } = req.body;
        
        let myUser = await userModel.findOne({ email: email });
        if (!myUser) return res.status(400).send({ status: false, message: "emailId is not present in db" });
        
        let token = jwt.sign({
                         userId: myUser._id.toString()},
                         "Login-api-assignment", //secrete Key
                         { expiresIn: '10m'});
        

                         res.cookie("token", token , {
                                        httpOnly : true,
                                        maxAge: 72 * 60 * 60 * 1000
                                    })
        bcrypt.compare(password, myUser.password, function (err, result) {
            if (result) {
                let token = jwt.sign({
                    userId: myUser._id.toString()
                }, "Login-api-assignment",
                    {
                        expiresIn: "10d"
                    });

                return res.status(200).send({message: "Login Succesfully", token  })
                
            }
            return res.status(400).send({ status: false, message: "wrong password" })

        });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const logout = async function(req,res){
    try{
        const cookie = req.cookies
        console.log( "cookie" ,cookie)
        if(!cookie.token) return res.status(400).send({ msg: "No refresh token in cookies" }) 
       
        res.clearCookie("token",{
            httpOnly: true,
            secure: true
        })
        return res.send({msg: "logout succesfully"})
    }catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }

}
  

module.exports = {createUser , login , logout}
