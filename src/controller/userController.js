const userModel = require("../model/userModel.js");
const mongoose = require('mongoose')

const createUser = async function(req,res){
    try{
        let data = req.body
        let user = await userModel.create(data)
        return res.send({msg:"success", data: user})

    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}


const login = async function(req,res){
    try{
        let data = req.body
        const {email , password} = data

        if (!email) {
            return res.status(400).send({ status: false, msg: "Missing email" });
        }
        
        if (!password) {
            return res.status(400).send({ status: false, msg: "PassWord is Required" });
        }

        const findUser = await userModel.findOne({email: email, password: password})
        
        return res.status(201).send({msg:"succes", data: findUser})

        

    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {createUser , login}
