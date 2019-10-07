var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    res.render('login.ejs', { text: 'none' });
  });
  

module.exports = router;