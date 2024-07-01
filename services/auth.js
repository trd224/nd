const jwt = require("jsonwebtoken");
const secret = "sdkfjskjdfgdsfsdlkfgjsdkjfgksdjgkjfdsgj";

function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secret);
}

function getUser(token){
    try{
        return jwt.verify(token, secret);
    }
    catch(err){
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser
}