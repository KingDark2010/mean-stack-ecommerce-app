const User = require('../db/models/user.model');
const router = require('express').Router();

router.post('/register', async (req, res) => {
    try{
        const user = new User(req.body);
        const activationToken = await user.generateActivationToken();
        await user.save();
        res.json({
            success: true,
            message: 'User registered successfully',
            user: user,
            activateTokens: activationToken
        });
    }
    catch(err){
        res.status(400).json({success: false, err: err.message});
    }
});

//activate user with activate token
router.get('/activate/:activateTokens', async (req, res) => {
    try{
        const activateTokens = req.params.activateTokens;
        console.log(typeof(activateTokens));
        const user = await User.findOne({activateTokens: activateTokens});
        
        if(user){
            user.isActivated = true;
            await user.save();
            res.json({
                success: true,
                message: 'User activated successfully'
            });
        }
        else{
            res.status(400).json({success: false, err: 'Invalid activate token'});
        }
    }
    catch(err){
        res.status(400).json({success: false, err: err.message});
    }
});

router.post('/login', async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({success: true, token});
    }
    catch(err){
        res.status(400).json({success: false, err: err.message});
    }
});

router.get('/login',)


module.exports = router;