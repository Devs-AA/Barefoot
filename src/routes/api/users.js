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

/**
 * @swagger
 *
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *  schemas:
 *    oldusers:
 *     type: object
 *     properties:
 *       message:
 *        type: string
 *       token:
 *        type: string
 *    requestBody:
 *     type: object
 *     properties:
 *       reason:
 *        type: string
 *       departmentId:
 *        type: string
 *       tripType:
 *        type: string
 *    tripBody:
 *     type: object
 *     properties:
 *       trips:
 *        type: object
 *    response:
 *     type: object
 *     properties:
 *      success:
 *        type: boolean
 *      message:
 *        type: string
 *      data:
 *        type: object
 *    errorResponse:
 *     type: object
 *     properties:
 *      success:
 *        type: boolean
 *      message:
 *        type: string
 */

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailController.signUp);


/**
 * @swagger
 *
 * /users/auth/register:
 *  post:
 *    tags:
 *      - Users
 *    summary: Sign in a old user
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.post('/users/auth/register', ValidationForEmptySignUpBody, ValidateEmptySignUpBodyProperty,

  EmptySignUpBodyPropertyValue, validationForSignUp, SendVerificationEmail, userController.addUser);

/**
 * @swagger
 *
 *    /users/email/verify:
 *    get:
 *     tags:
 *       - Users
 *     summary: Verfify email of a user
 *     parameters:
 *     - name: id
 *       in: query
 *       description: copy the query token part sent to your email
 *       schema:
 *        type: string
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */

router.get('/users/email/verify', emailController.confirmEmailVerificaionToken);

/**
 * @swagger
 *
 * /users/auth/login:
 *  post:
 *    tags:
 *      - Users
 *    summary: Sign in a old user
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/oldusers'
 *      '403':
 *        description: forbidden request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.post('/users/auth/login', validationForSignIn, loginAUser);

/**
 * @swagger
 *
 *    /users/auth/token/google:
 *    get:
 *     tags:
 *       - Users
 *     summary: Verfify email of a user
 *     parameters:
 *     - name: access_token
 *       in: query
 *       description: This token is generated in the frontend.
 *       schema:
 *        type: string
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/users/auth/token/google', passport.authenticate('google-token',

  { scope: ['profile', 'email'], session: false }), NoUserFromPassport, googleLogin);


/**
 * @swagger
 *
 *    /users/auth/token/facebook:
 *    get:
 *     tags:
 *       - Users
 *     summary: Verfify email of a user
 *     parameters:
 *     - name: access_token
 *       in: query
 *       description: This token is generated in the frontend.
 *       schema:
 *        type: string
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/users/auth/token/facebook', passport.authenticate('facebook-token',

  { scope: ['public_profile', 'email'], session: false }), NoUserFromPassport, facebookLogin);

/**
 * @swagger
 *
 *    /users/myaccount:
 *    get:
 *     tags:
 *       - Users
 *     summary: Gets and display user id when logged in
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/properties'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/users/myaccount', authorization, indexController.Welcome);

/**
 * @swagger
 *
 *    /users/auth/logout:
 *    delete:
 *     tags:
 *       - Users
 *     summary: Invalidate a token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/properties'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.delete('/users/auth/logout', authorization, logOut);

/**
 * @swagger
 *
 * /users/roles:
 *  patch:
 *    tags:
 *      - Users
 *    summary: Update a user Role. Action can only be performed by superadmin
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              roleId:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.patch('/users/roles', [authorization, validateSetRole,

  permit([roleIds.superAdmin]), checkRoleConflict], userController.changeRole);

/**
 * @swagger
 *
 * /users/passwords/forgot:
 *  post:
 *    tags:
 *      - Users
 *    summary: Sends forgot password to user email
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/oldusers'
 *      '403':
 *        description: forbidden request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */

router.post('/users/passwords/forgot', forgotPasswordCheck, forgotPassword);

/**
 * @swagger
 *
 * /users/passwords/reset/{userId}:
 *  post:
 *    tags:
 *      - Users
 *    summary: Verify userId credential that was sent to email
 *    parameters:
 *     - name: userId
 *       in: path
 *       description: copy the params url sent to your email
 *       schema:
 *        type: string
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *              confirmPassword:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/oldusers'
 *      '403':
 *        description: forbidden request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */

router.post('/users/passwords/reset/:userId', resetPasswordCheck, resetPassword);


/**
 * @swagger
 *
 *    /users/profile:
 *    get:
 *     tags:
 *       - Users
 *     summary: Gets and display user profile when logged in
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/users/profile', authorization, getUserProfile);


/**
 * @swagger
 *
 * /users/toggle/saveprofile:
 *  patch:
 *    tags:
 *      - Users
 *    summary: Sign in a old user
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              saveProfile:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.patch('/users/toggle/saveprofile', authorization, allowedToggleValue, updateSavedProfile);


/**
 * @swagger
 *
 *    /users/saveprofile:
 *    get:
 *     tags:
 *       - Users
 *     summary: Gets and display user profile when logged in
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */

router.get('/users/saveprofile', authorization, getSavedProfile);

/**
 * @swagger
 *
 * /users/profile:
 *  patch:
 *    tags:
 *      - Users
 *    summary: Sign in a old user
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              username:
 *                type: string
 *              dateOfBirth:
 *                type: date
 *              preferredLanguage:
 *                type: string
 *              preferredCurrency:
 *                type: string
 *              gender:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              countryCode:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.patch('/users/profile', authorization, validateProfileData, checkInputFromDepartmentDb,

  updateUserProfile);


export default router;
