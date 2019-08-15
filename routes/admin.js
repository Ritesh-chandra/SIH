var express = require('express');
var bp = require('body-parser');
var router = express.Router();
var json2csv = require('json2csv').parse;
var csv = require('fast-csv');
var mongoose=require('mongoose')

var fileSchema=new mongoose.Schema({
    STATE : String,
    DISTRICT : String,
    BLOCK : String,
    INUSE : Number,
    TOTAL : Number
})

var File = mongoose.model('File', fileSchema);
 
var urlep = bp.urlencoded({extended: false});

router.get('/',(req,res)=>{
    console.log("yahan bhi aaya tha");
    res.render('admin');
});

router.post('/upload',(req,res)=>{
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var dataFile = req.files.file;
 
    var info = [];

         
    csv
     .fromString(dataFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         info.push(data);
     })
     .on("end", function(){
         File.create(info, function(err, documents) {
            if (err) throw err;
         });
          
         res.status(200).send(info.length + ' Records have been successfully uploaded.');
     });

})

router.get('/template', (req,res)=>{
    var csv = json2csv({ STATE: 'ANDHRA PRADESH', DISTRICT: 'ADILABAD',BLOCK: 'ADILABAD',INUSE:21,TOTAL:21});
 
    res.set("Content-Disposition", "attachment;filename=file.csv");
    res.set("Content-Type", "application/octet-stream");
 
    res.send(csv);
})

router.post('/', urlep, (req,res)=>{
    console.log("yahan aaya admin mein",req.body);
    if(req.body.username==="admin@mowr.in"&&req.body.password==="admin123")
    {
        console.log("yahan pahucha");
        res.redirect('/admin');
    }
  });

module.exports = router;