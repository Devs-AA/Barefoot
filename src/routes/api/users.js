import { Router } from 'express';
import passport from '../../config/passport';
// import passport from 'passport';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import { authorization, NoUserFromPassport } from '../../middlewares/auth/auth';
import {
  validationForSignUp, ValidationForEmptySignUpBody, ValidateEmptySignUpBodyProperty,
  EmptySignUpBodyPropertyValue, validateProfileData, validationForSignIn,
} from '../../middlewares/validation/validation';
import emailController from '../../controllers/emailController';
import {
  validateSetRole, permit, checkRoleConflict, allowedToggleValue,
  checkInputFromDepartmentDb,
} from '../../middlewares/users';
import { roleIds } from '../../helpers/default';
import userController from '../../controllers/userController';
import indexController from '../../controllers/indexController';
import validate from '../../middlewares/validate';

const { forgotPasswordCheck, resetPasswordCheck } = validate;

const {
  forgotPassword, resetPassword, loginAUser, getUserProfile,
  updateUserProfile, googleLogin, facebookLogin, logOut, updateSavedProfile, getSavedProfile
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
// @desc this route recieves the access token from the client side and
// sends this detail as query params
// and we authenticate this accessToken from our backend, if valid we generate a
// token and saves the user
// in our database.
router.get('/users/auth/token/google', passport.authenticate('google-token',

  { scope: ['profile', 'email'], session: false }), NoUserFromPassport, googleLogin);


// @Route POST /api/v1/users/auth/facebook
// @desc this route recieves the access token from the client side and
// sends this detail as query params
// and we authenticate this accessToken from our backend
// if valid we generate a token and saves the user
// in our database.
router.get('/users/auth/token/facebook', passport.authenticate('facebook-token',

  { scope: ['public_profile', 'email'], session: false }), NoUserFromPassport, facebookLogin);

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


// This route changes the SaveProfile attributes of the user column boolean
router.patch('/users/toggle/saveprofile', authorization, allowedToggleValue, updateSavedProfile);

// This route get profile details for user who has saved there profile details to
// be used all throughout the application.
// This route display the user info if saveProfile is true
router.get('/users/saveprofile', authorization, getSavedProfile);

// This is the route to edit user profile details
router.patch('/users/profile', authorization, validateProfileData, checkInputFromDepartmentDb,

  updateUserProfile);


export default router;
