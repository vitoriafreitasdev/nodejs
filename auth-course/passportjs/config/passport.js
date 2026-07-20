
import passport from 'passport';
import passportLocal from 'passport-local'
import connection from './database.js';
import { validPassword } from '../lib/passwordUtils.js';

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
}

const LocalStrategy = passportLocal.Strategy;
const User = connection.models.User;

//Passport.js sabe que userName e pass são o uname e pw por causa da ordem dos parâmetros e da configuração do customFields.
//primeiro parametro é sempre o username no passport-local e segundo parametro é sempre a password
const verifyCallback = (userName, pass, cb) => {

    User.findOne({username: userName})
        .then((user) => {
      
            if(!user) {return cb(null, false)}

            const isValid = validPassword(pass, user.hash, user.salt)

            if(isValid){
                return cb(null, user)
            }
            else{
                return cb(null, false)
            }

        })
        .catch((err) => {cb(err)})
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)
/*
WHAT DOES SERIALIZE USER MEAN?
1. "express-session" creates a "req.session" object, when it is invoked via app.use(session({..}))
2. "passport" then adds an additional object "req.session.passport" to this "req.session".
3. All the serializeUser() function does is,
receives the "authenticated user" object from the "Strategy" framework, and attach the authenticated user to "req.session.passport.user.{..}"
In above case we receive {id: 123, name: "Kyle"} from the done() in the authUser function in the Strategy framework, 
so this will be attached as 
req.session.passport.user.{id: 123, name: "Kyle"}

3. So in effect during "serializeUser", the PassportJS library adds the authenticated user to end of the "req.session.passport" object.
This is what is meant by serialization.
This allows the authenticated user to be "attached" to a unique session. 
This is why PassportJS library is used, as it abstracts this away and directly maintains authenticated users for each session within the "req.session.passport.user.{..}"
*/

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

/* 
WHAT DOES DE SERIALIZE USER MEAN?
1. Passport JS conveniently populates the "userObj" value in the deserializeUser() with the object attached at the end of "req.session.passport.user.{..}"
2. When the done (null, user) function is called in the deserializeUser(), Passport JS takes this last object attached to "req.session.passport.user.{..}", and attaches it to "req.user" i.e "req.user.{..}"
In our case, since after calling the done() in "serializeUser" we had req.session.passport.user.{id: 123, name: "Kyle"}, 
calling the done() in the "deserializeUser" will take that last object that was attached to req.session.passport.user.{..} and attach to req.user.{..} 
i.e. req.user.{id: 123, name: "Kyle"}
3. So "req.user" will contain the authenticated user object for that session, and you can use it in any of the routes in the Node JS app. 
eg. 
app.get("/dashboard", (req, res) => {
res.render("dashboard.ejs", {name: req.user.name})
})
*/

passport.deserializeUser((userId, cb) => {
    User.findById(userId)
        .then((user) => {
            cb(null, user)
        })
        .catch(err => cb(err))
})