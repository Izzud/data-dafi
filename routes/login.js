const jwt = require("jsonwebtoken");
var router = require('express').Router();
const bcrypt = require('bcrypt');
const { query } = require("../config/db");

const { SECRET_KEY } = process.env;

var jwtOptions = {}
jwtOptions.secretOrKey = SECRET_KEY;

router.post("/", function (req, response) {
    query('SELECT username, password FROM app_user where username = $1', [ req.body.username ]).then(result => {
        login = result.rows[0]
 
        if(login && login != null && bcrypt.compareSync(req.body.password, login.password)){
            var user = login.username
            var payload = {id: user};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            response.json({status : 200, user: user, token: token});
            console.log('User: ' + req.body.username + " has logged in.")
        }
        else{
            response.json({status : 401});
            console.log('Username/Password combination is incorrect.');
        }
        response.status(200);
    }).catch(e => { 
        console.error(e.stack); 
        response.status(400); 
        response.send(e); 
    });
 });

router.get("/", function (req, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('CURRENTLY TESTING LOGIN');
})

module.exports = router;