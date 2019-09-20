To protect a route, kindly import the permit middleware from the users file in the middlewares folder. 
The permit function takes in an array of ids of the roles permitted to access the route.
To get the id of an role. Simply check the default.js file in the helpers folder.

Example: permit([rolesId.manager, rolesId['Travel Team Member']])
The example above will give access to manager and travel team member roles.