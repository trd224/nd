const Url = require("../models/url");
const shortid = require("shortid");

async function generateNewShortUrl(req, res){
    const {redirectUrl} = req.body;
    const shortId = shortid.generate();

    await Url.create({
        shortId: shortId,
        redirectUrl: redirectUrl,
        visitedHistory: [],
        createdBy: req.user
    })

    return res.render("generate-shortid");
}

async function getAllUrls(req, res){
    const urls = await Url.find({});
    return res.json({urls});
}

async function visitShortUrl(req, res){
    const shortId = req.params.shortId;
    
    const urlObj = await Url.findOneAndUpdate({shortId},{
        $push:{
            visitedHistory: {
                timestamp: Date.now()
            }
        }
    })
    

    res.redirect(urlObj.redirectUrl);

   
}

module.exports = {
    generateNewShortUrl,
    getAllUrls,
    visitShortUrl
}