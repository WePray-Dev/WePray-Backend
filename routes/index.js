var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ 
    status : 'successful',
    message: 'This is We-Pray API',
    data: null
  });
});

module.exports = router;
