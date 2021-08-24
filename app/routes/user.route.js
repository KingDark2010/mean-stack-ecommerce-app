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
router.get('/activate/:activateToken', async (req, res) => {
    try{
        //get user with activate token
        const user = await User.findOne({activateToken: req.params.activateToken});
        if(user){
            if(user.isActive){
                user.activateToken = null;
                res.status(400).json({success: false, err: 'User already activated'});
            }
            if(user.activateTokenExpired() == true){
                user.activateToken = null;
                res.status(400).json({success: false, err: 'Activation token expired'});
            }
            else{
                //update user
                user.activate();
                res.json({
                    success: true,
                    message: 'User activated successfully'
                });
            }
        }
        else{
            res.status(400).json({success: false, err: 'Invalid activation token'});
        }
    }
    catch(err){
        res.status(400).json({success: false, err: err.message});
    }
});

//reactivate user
router.post('/reactivate', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(user){
            if(user.activateToken === null){
                const activationToken = await user.generateActivationToken();
                await user.save();
                res.json({
                    success: true,
                    message: 'New Token was generated',
                    user: user,
                    activateTokens: activationToken
                });
            }
            else{
                if(user.isActive){
                    res.status(400).json({success: false, err: 'User already activated'});
                }
                else{
                    user.activateToken = null;
                    const activationToken = await user.generateActivationToken();
                    await user.save();
                    res.json({
                        success: true,
                        message: 'New Token was generated',
                        user: user,
                        activateTokens: activationToken
                    });
                }

            }
        }
        else{
            res.status(400).json({success: false, err: 'Invalid email or password'});
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