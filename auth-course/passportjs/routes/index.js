import express from 'express'
import passport from 'passport';
import connection from '../config/database.js';

import {validPassword, genPassword} from '../lib/passwordUtils.js'
import {isAuth, isAdmin} from './authMiddleware.js'

const User = connection.models.User
const router = express.Router()

/**
 * -------------- POST ROUTES ----------------
*/
//
router.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login-success'}));


router.post('/register', (req, res, next) => {
    const name = req.body.uname
    const password = req.body.pw

    const saltHash = genPassword(password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const user = {
        username: name,
        hash: hash,
        salt: salt,
        admin: true
    }

    const newUser = new User(user)
    
    newUser.save().then((user) => console.log(user))

    res.redirect('/login')
});


/**
 * -------------- GET ROUTES ----------------
*/

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('<h1>Admin Section</h1><p><a href="/logout">Logout and reload</a></p>');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    /* 
    Passport JS also conveniently provides us with a “req.logOut()” function, which when called clears the “req.session.passport” object and removes any attached params.
    */
    req.logout((err) => {
        if (err) { return err }
        res.redirect('/');
    });
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

export default router