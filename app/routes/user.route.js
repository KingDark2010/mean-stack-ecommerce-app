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
        //check if token is not expired
        if(user.activateTokenExpired()){
            user.activateToken = null;
            res.status(400).json({success: false, err: 'Activation token expired'});
            res.redirect('/reactivate');
        }
        if(user){
            user.isActive = true;
            user.activateToken = null;
            await user.save();
            res.json({
                success: true,
                message: 'User activated successfully'
            });
        }
    }
    catch(err){
        res.status(400).json({success: false, err: err.message});
    }
});

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