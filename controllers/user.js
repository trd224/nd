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
    res.cookie("token", token);
    return res.redirect("/");

    //return res.json({token});
}

async function getUserByQuery(req, res){

    try {
        const query = {};

        // for (const [key, value] of Object.entries(req.query)) {
        //     query[key] = value
        // }

        for(let key in req.query){
            console.log(key)
            query[key] = req.query[key]
        }

        console.log("query", query);
        

        const users = await User.find(query,{_id: 0, role: 0});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

module.exports = {
    userSignup,
    userLogin,
    getUserByQuery
}