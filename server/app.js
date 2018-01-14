var express = require('express')
var path = require('path');
var app = express();
var multer = require('multer');
var axios = require('axios');
var mongoose = require('mongoose')
var mongoXlsx = require('mongo-xlsx');
var employeeSchema = require('./model/employeeSchema')

app.listen(3000, () => console.log('Example app listening on port 3000!'))


app.use(express.static(path.join(__dirname, '../public'))); // services all the static resources like html files, css , etc.

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const db = mongoose.createConnection('mongodb://localhost:27017/userdb')
mongoose.Promise = global.Promise

app.post('/fileUpload', upload.single('file'), (req, res) => {
 const file = req.file; // file passed from client
 const meta = req.body; // all other values passed from the client, like name, etc..
// console.log(file);


var xlsx  = './'+file.path;

  mongoXlsx.xlsx2MongoData(xlsx, null, function(err, data) {
    console.log(data);

    var emp = new employeeSchema(data)

    emp.save(function(err){
       if(err)
       {
         res.send(err);
       }
       else
       {
         console.log('Saved successfully');
         //res.send("Wave successful");
       }
    })

    /*
    [{ Name: 'Eddie', Email: 'edward@mail' }, { Name: 'Nico', Email: 'nicolas@mail' }]
    */
  });
 res.send('File Uploaded Successfully')

});
