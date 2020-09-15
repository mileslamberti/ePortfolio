var express = require('express');
var router = express.Router();

router.post('/upload', function(req, res) {
    console.log(req.files.myproject); // the uploaded file object
  });

module.exports = router;