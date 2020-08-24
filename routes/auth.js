const express = require('express');
const router = express.Router();
const { check, body} = require('express-validator/check');
const User = require("../models/user");
const authController = require('../controllers/auth');

//Get routes
router.get('/login',authController.getLogin);
router.get('/signup',authController.getSignup);
router.get('/reset', authController.getReset);
router.get('/reset/:token', authController.getNewPassword);

//Post routes
router.post('/logout',authController.postLogout);

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage('Please Enter a valid email'),
    body('password','Please Enter valid password').isLength({min: 5})
        
],
authController.postLogin);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .custom((value, { req }) => {
        // if(value === 'test@test.com'){
        //     throw new Error('this is forbidden email');
        // }
        // return true;
        return User.findOne({
          email: value,
        }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email exists already.Please pick a different one"
            );
          }
        });
      }),
    body("password", "Please Enter password atleast 5 characters").isLength({
      min: 5,
    }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password dont match");
      }
      return true;
    }),
  ],
  authController.postSignup
);
router.post('/reset', authController.postReset);
router.post('/new-password', authController.postNewPassword);


module.exports = router;