To protect a route from an unsigned user kindly import authorization middleware

Example: to protect users/myaccount, we call authorization .
router.get('/users/myaccount', authorization, indexController.Welcome);