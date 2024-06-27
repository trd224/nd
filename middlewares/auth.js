const {getUser} = require("../services/auth");

function checkForAuthentication(req, res, next){
   
    const token = req?.cookies?.uid;

    // req.user = null;
    
    // const authorizationHeaderValue = req.headers['authorization'];

    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWidth("Bearer")){
    //     return next();
    // }
   
    // const token = authorizationHeaderValue.split(" ")[1];

    if(!token) return res.redirect("/login");

    const user = getUser(token);

    if(!user) return res.redirect("/login");

    console.log("user",user);

    req.user = user;

    next();
}

// function restrictTo(roles = []){

// }

module.exports = {
    checkForAuthentication,
    //restrictTo
}