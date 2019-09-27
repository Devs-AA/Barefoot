import { Router } from 'express';
import passport from '../../config/passport';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import { authorization, NoUserFromPassport } from '../../middlewares/auth/auth';
import {
  validationForSignUp, ValidationForEmptySignUpBody, ValidateEmptySignUpBodyProperty,
  EmptySignUpBodyPropertyValue, validateProfileData, validationForSignIn,
} from '../../middlewares/validation/validation';
import emailController from '../../controllers/emailController';
import { validateSetRole, permit, checkRoleConflict } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';
import userController from '../../controllers/userController';
import indexController from '../../controllers/indexController';
import validate from '../../middlewares/validate';

const { forgotPasswordCheck, resetPasswordCheck } = validate;

const {
  forgotPassword, resetPassword, loginAUser, getUserProfile,
  updateUserProfile, googleLogin, facebookLogin, logOut
} = userController;

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailController.signUp);

router.post('/users/auth/register', ValidationForEmptySignUpBody, ValidateEmptySignUpBodyProperty,

  EmptySignUpBodyPropertyValue, validationForSignUp, SendVerificationEmail, userController.addUser);

router.get('/users/email/verify', emailController.confirmEmailVerificaionToken);


// @route POST /api/v1/users/auth/login
// @desc Logins a verified User / Set JWT Token in cookies
// @access Public
router.post('/users/auth/login', validationForSignIn, loginAUser);

// @Route POST /api/v1/users/auth/google
// @desc prompt user to select an account from google to be used in login user and send
// the user to the callback route
router.get('/users/auth/google', passport.authenticate('google',
  { scope: ['profile', 'email'], session: false }));


// @Route POST /api/v1/users/auth/callback
// @desc redirect user to the where middleware and controller get user details
//  and generate a token to be used for other routes
router.get('/users/auth/google/callback', passport.authenticate('google'),

  NoUserFromPassport, googleLogin);

// @Route POST /api/v1/users/auth/google
// @desc prompt user to select an account from google to be used in login user and send
// the user to the callback route
router.get('/users/auth/facebook', passport.authenticate('facebook',
  { scope: ['public_profile', 'email'], session: false }));


// @Route POST /api/v1/users/auth/callback
// @desc redirect user to the where middleware and controller get user details
//  and generate a token to be used for other routes
router.get('/users/auth/facebook/callback', passport.authenticate('facebook'),

  NoUserFromPassport, facebookLogin);

/**
 * Example of how to make use of a protected route
 * Simply call the authorization and jwtVerify middleware in the route you want
 * to protect
 */
router.get('/users/myaccount', authorization, indexController.Welcome);

// It should logout a user by invalidating the user token
router.delete('/users/auth/logout', authorization, logOut);

//  It set roles for users
router.patch('/users/roles', [authorization, validateSetRole,

  permit([roleIds.superAdmin]), checkRoleConflict], userController.changeRole);

// @route POST /api/v1/users/passwords/forgot
// @desc Generate User Password Reset / Returning JWT Token
// @access Public
router.post('/users/passwords/forgot', forgotPasswordCheck, forgotPassword);

// @route POST /api/v1/users/passwords/reset/:userId/
// @desc Resets a User Password / Returns a new Password
// @access Public
router.post('/users/passwords/reset/:userId', resetPasswordCheck, resetPassword);

router.get('/users/profile', authorization, getUserProfile);

router.patch('/users/profile', validateProfileData, authorization, updateUserProfile);


export default router;
