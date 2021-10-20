const responseCreator = require('../helpers/response.helper');
const User = require('../db/models/user.model');

const registerUser = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.generateActivationToken();
        await user.save();
        res.status(201).send(responseCreator(201, user, 'user Created successfully'));
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}

const activateUser = async (req, res) => {
    try{
        const user = await User.findOne({activateToken: req.params.activateToken});
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            if(user.isActive){
                user.activateToken = null;
                await user.save();
                return res.status(200).send(responseCreator(200, user, 'user already activated'));
            }
            if(user.activateTokenExpired() == true){
                user.activateToken = null;
                await user.save();
                return res.status(400).send(responseCreator(400, null, 'token expired'));
            }
            user.isActive = true;
            user.activateToken = null;
            await user.save();
            return res.status(200).send(responseCreator(200, user, 'user activated successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}

const reactivateUser = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            if(user.isActive){
                return res.status(200).send(responseCreator(200, user, 'user already activated'));
            }
            user.activateToken = null
            await user.generateActivationToken();
            await user.save();
            return res.status(200).send(responseCreator(200, user, 'user reactivated successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}

const userLogin =  async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            const token = await user.generateAuthToken();
            return res.status(200).send(responseCreator(200, {user, token}, 'user logged in successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}

const userLogout = async (req, res) => {
    try{
        //find user by token inside array of tokens
        const user = await User.findOne({'tokens.token': req.body.token});
        console.log(user);
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            user.tokens = user.tokens.filter(token => token.token !== req.body.token);
            await user.save();
            return res.status(200).send(responseCreator(200, null, 'user logged out successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}


const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        if(!users){
            return res.status(404).send(responseCreator(404, null, 'no users found'));
        }
        if(users){
            return res.status(200).send(responseCreator(200, users, 'users found successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            return res.status(200).send(responseCreator(200, user, 'user found successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}

const updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            return res.status(200).send(responseCreator(200, user, 'user updated successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}

const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            return res.status(200).send(responseCreator(200, user, 'user deleted successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}


//export module

module.exports = {registerUser, activateUser, reactivateUser, userLogin, getAllUsers, getUserById, updateUser, deleteUser, userLogout};