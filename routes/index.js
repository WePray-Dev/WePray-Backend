const express = require('express');
const router = express.Router();
const me = require('../package.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ 
    status: 'successful', 
    message: 'Retrieved message successfully', 
    data: {
      name: me.name, 
      version: me.version
    } 
  });
});

module.exports = router;
