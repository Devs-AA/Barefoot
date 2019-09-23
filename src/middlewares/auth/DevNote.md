To protect a route from an unsigned user kindly import  two middleware named authorization and jwtVerify 

Example: to protect users/myaccount, we call authorization and jwtVerify and pass Your own middleware.
router.get('/users/myaccount', authorization, jwtVerify, indexController.Welcome);