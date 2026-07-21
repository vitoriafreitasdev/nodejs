
const isAuth = (req, res, next) => {

    /* 
        Use the “req.isAuthenticated()” function to protect logged in routes
        Passport JS conveniently provides a “req.isAuthenticated()” function, that

        returns “true” in case an authenticated user is present in “req.session.passport.user”, or
        returns “false” in case no authenticated user is present in “req.session.passport.user”.
    */

    if(req.isAuthenticated()){
        next()
    }
    else{
        res.status(401).json({msg: "Not authorized"})
    }
     
}

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin){
        next()
    }
    else{
        res.status(401).json({msg: "Not authorized only admin"})
    }

}

export {isAuth, isAdmin}