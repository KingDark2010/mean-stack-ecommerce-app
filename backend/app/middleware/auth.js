//create auth middleware
const User = require('../db/models/user.model');
const jwt = require('jsonwebtoken');
const responseCreator = require('../helpers/response.helper');


const userAuth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id:decodedToken._id, 'tokens.token':token})
        if(!user) throw new Error('please authintcate')
        req.user=user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send(responseCreator(500, e.message,'not authorized'))
    }
}

const AuthSeller = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id:decodedToken._id, 'tokens.token':token})
        if(!user) throw new Error('please authintcate')
        if(user.isSeller == true ){
            req.user=user
            req.token = token
            next()
        }
        else{
            res.status(500).send(responseCreator(500, 'you are not authorized','not authorized'))
        }
    }
    catch(e){
        res.status(500).send(responseCreator(500, e.message,'not authorized'))
    }
}

const AuthAdmin = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id:decodedToken._id, 'tokens.token':token})
        if(!user) throw new Error('please authintcate')
        if(user.isAdmin == true ){
            req.user=user
            req.token = token
            next()
        }
        else{
            res.status(500).send(responseCreator(500, 'you are not authorized','not authorized'))
        }
    }
    catch(e){
        res.status(500).send(responseCreator(500, e.message,'not authorized'))
    }
}

module.exports = {
    userAuth,
    AuthSeller,
    AuthAdmin
}