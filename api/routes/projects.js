var express = require('express');
var router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({storage: storage}).single("file")



router.post('/uploadPortfolio', (req, res) => {
  if(err) return res.status(400).json({success: false, err})
  return res.status(200).json({success: true})
});

router.post('/uploadFile', (req, res) => {
  upload(req, res, err => {
    console.log(req)
    console.log(res)
    console.log(err)
    if(err) return res.json({success: false, err})
    return res.json({success: true, file: res.req.file.path, fileName: res.req.filename})
  })
});


router.post('/upload', function(req, res) {
    console.log(req.files.myproject); // the uploaded file object
  });

module.exports = router;