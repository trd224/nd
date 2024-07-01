const {getUser} = require("../services/auth");

// function checkForAuthentication(req, res, next){

//     req.user = null;
    
//     const authorizationHeaderValue = req.headers['authorization'];


//     if(!authorizationHeaderValue || !authorizationHeaderValue.startsWidth("Bearer")){
//         return next();
//     }
   
//     const token = authorizationHeaderValue.split(" ")[1];

//     //if(!token) return res.redirect("/login");

//     const user = getUser(token);

//     //if(!user) return res.redirect("/login");

//     //console.log("user",user);

//     req.user = user;

//     return next();
// }

function authenticate(req, res, next){
    const token = req?.cookies?.token;

    if(!token) return res.redirect("/login");

    const user = getUser(token);
    console.log(user);

    if(!user) return res.redirect("/login");

    console.log(req.user);
    req.user = user;

    next();
}

function authorize(roles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect("/login");
        }

        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }

        next();
    };
}

module.exports = {
    authenticate,
    authorize
}