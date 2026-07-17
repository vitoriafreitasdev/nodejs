import passport from 'passport';
import passportLocal from 'passport-local'
import connection from './database';

const LocalStrategy = passportLocal.Strategy;

const User = connection.models.User;

// TODO: passport.use();