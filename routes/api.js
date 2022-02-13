var router = require('express').Router();

router.get("/", function (req, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('CURRENTLY TESTING API v0.5');
});

module.exports = router;