import express from 'express'
import mongoose from 'mongoose';
import passport from 'passport';
import crypto from 'crypto'
import routes from './routes/index.js';
import connection from './config/database.js';
import MongoStore from 'connect-mongo';
import session from 'express-session'

// Package documentation - https://www.npmjs.com/package/connect-mongo

// Need to require the entire Passport config module so app.js knows about it
import './config/passport.js'

/**
 * -------------- GENERAL SETUP ----------------
 */


// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);