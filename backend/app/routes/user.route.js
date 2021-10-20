const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.post('/register', userController.registerUser);

router.post('/activate/:activateToken', userController.activateUser);

//reactivate user
router.post('/reactivate', userController.reactivateUser);

// login user
router.post('/login',userController.userLogin);

// get all users route
router.get('/all', auth.AuthAdmin, userController.getAllUsers);

// get user by id route
router.get('/:id', userController.getUserById);

// update user route
router.put('/update/:id', userController.updateUser);

// delete user route
router.delete('/delete/:id', userController.deleteUser);

// logout user
router.post('/logout', userController.userLogout);

//

// deactivate user route for future use
/* router.patch('/deactivate/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {isActive: false}, {new: true});
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'user not found'));
        }
        if(user){
            return res.status(200).send(responseCreator(200, user, 'user deactivated successfully'));
        }
    }
    catch(err){
        res.status(500).send(responseCreator(500, null, err.message));
    }
}); */

module.exports = router;