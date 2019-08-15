var express = require('express');
var router = express.Router();
var mongo=require("mongoose");
var coll = require('../modals/collections');
var Place = coll.Place;
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
 var arr=[];
 Place.find({}).distinct('state').then((data)=>{
  console.log("index rendered from routes/index.js");
  res.render('index', { title: 'Express' ,data:data});
 })
});
router.get('/district/:id',function(req,res,next){
 console.log("in district");
   console.log(req.params.id);
  Place.aggregate( [
   { $match: {state: req.params.id } },
   { $group : { _id : "$district", places: { $push: "$block" } } }
  ]).then((x)=>{
   console.log(x);
   res.json(x);
  });
});
module.exports = router;