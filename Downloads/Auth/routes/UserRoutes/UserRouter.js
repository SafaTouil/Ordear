const router = require('express').Router()
const userController = require ('../../controllers/UserController/UserController');


router.post('/register',userController.register_controller);
router.post('/login',userController.login_controller);
router.post('/activate',userController.validationAccount_controller);
router.put('/forgot-password',userController.forgotPassword_controller);
router.put('/reset-password',userController.resetPassword_controller);
router.post('/is-validate-token',userController.isValidateToken_controller);
router.get('/logout',userController.logout_controller);

//Profile Routes
router.get('/profile/get-user',userController.getUser_controller);
router.put('/profile/update-user/:id',userController.updateUser_controller);
router.put('/profile/update-user-image/:id',userController.updateImage_controller);

module.exports = router;
