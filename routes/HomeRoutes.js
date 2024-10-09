const routes = require("express").Router();
routes.post("/" , async( req , res ) =>{
    res.send({
        body:"welcome"
    })
});


module.exports = routes