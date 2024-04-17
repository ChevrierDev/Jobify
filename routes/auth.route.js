const express = require('express');


const authRoute = express.Router();
const {
    userGetAuth,
    recruterGetRegister,
    recruterGetAuth,
    postNewRecruterAuth,
}= require('../controllers/auth.controller')

//User Auth routes
authRoute.get('/', userGetAuth);

//Recruter Auth routes
authRoute.get('/recruter',  recruterGetAuth);
authRoute.get('/recruter/register',  recruterGetRegister);
authRoute.post('/recruter/register', postNewRecruterAuth)

//Admin Auth routes


module.exports = authRoute;