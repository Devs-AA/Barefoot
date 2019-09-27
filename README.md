# Barefoot Nomad - Making company travel and accomodation easy and convinient.

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.
---

[![Build Status](https://travis-ci.org/Devs-AA/Barefoot.svg?branch=stage)](https://travis-ci.org/Devs-AA/Barefoot)                       [![Coverage Status](https://coveralls.io/repos/github/Devs-AA/Barefoot/badge.svg?branch=stage)](https://coveralls.io/github/Devs-AA/Barefoot?branch=stage)        [![](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)

### API DOCUMENTATION

[Endpoint Documentation](http://localhost:3000/api-docs/)

### HOW TO USE THE DOTENV PACKAGE TO SET AND GET ENVIRONMENT VARIABLES

    TO SETUP EVIRONMENTAL VARIABLES FOLLOW THE STEPS BELOW
        - Ensure all dependencies are installed by running the command `npm install` in the terminal
        - Create files `.env, .env.example` in the root of the project. 
        - Enter your variable name(UPPERCASE) in the following format in the `.env` file
            `ENVIRONMENT_VARIABLE_NAME=value`
        - Enter only your variable name(UPPERCASE) and assignment operator in `.env.example` file 
            ENVIRONMENT_VARIABLE_NAME=
        - Ensure not to put in values in the .env.example file, as this will be made public

    TO RETRIEVE EVIRONMENTAL VARIABLES FOLLOW THE STEPS BELOW
        To use access the value in an environment variable, simply use the syntax `proces.env.<ENVIRONMENT_VARIABLE_NAME>` to retrieve the value of that variable
        Example process.env.secret




