const User = require("../models/user");
const { setUser } = require("../services/auth");

async function userSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name: name,
        email: email,
        password: password
    })
    return res.redirect("/login");
}

async function userLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});

    if(!user){
        return res.json({msg: "email or password is incorrect"}).render("login");

    }
    const token = setUser(user);
    //console.log(token);
    res.cookie("uid", token);
    return res.redirect("/");

    //return res.json({token});
}

module.exports = {
    userSignup,
    userLogin
}