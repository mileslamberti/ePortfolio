var express = require('express');
var router = express.Router();
const IncomingForm = require('formidable').IncomingForm

router.post('/upload',(req,res) => {
  var form = new IncomingForm()

  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
  })
  form.on('end', () => {
    res.json()
  })
  form.parse(req)

  console.log(req);
  console.log(res);
});
router.get('/', function(req, res, next) {
    res.send('Connected.');
});
module.exports = router;

