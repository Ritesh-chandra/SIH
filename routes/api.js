var express = require('express');
var router = express.Router();
var mongo = require('mongoose');
var coll = require('../modals/collections');
var Address= coll.Address;
var Shallowmitwo = coll.Shallowmitwo;
var Shallowmione = coll.Shallowmione;
var Deepmitwo = coll.Deepmitwo;
var Irrigationshallow=coll.Irrigationshallowe;
var Irrigationdeep=coll.Irrigationdeep;
var Shallowdepthcat=coll.Shallowdepthcat;
var Deepdepthcat=coll.Deepdepthcat
var Deepmione =coll.Deepmione;
var Depthlevelprediction = coll.Depthlevelprediction ;
var Waterlevelprediction = coll.Waterlevelprediction;
var Dugwellprediction = coll.Dugwellprediction;
/* GET users listing. */

var shallow={
  0:"0-20mts",
  1:"20-40mts",
  2:"40-60mts",
  3:"60-70mts",
  4:"greaterthan70"
}

var deep={
  0:"70-90mts",
  1:"90-110mts",
  2:"110-130mts",
  3:"130-150mts",
  4:"greaterthan150mts"
}
router.get('/:id', function(req, res, next) {
 var st= req.params.id;
 //console.log(st);
  Shallowmitwo.aggregate(
    [
      { $match: {STATE: st } },
    
      { $group : { _id : "$DISTRICT", inuse: { $sum: "$INUSE" }, total: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" } } }
    ],
    function(err,results) {
      if (err) throw err;
      res.json(results);
  }
 )
})
router.get('/deep/:id', function(req, res, next) {
 var st=req.params.id;
  Deepmitwo.aggregate(
    [
      { $match: {STATE:  st } },
      { $group : { _id : "$DISTRICT", inuse: { $sum: "$INUSE" }, total: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" } } }
      
    ],
    function(err,results) {
      if (err) throw err;
      res.json(results);
  }
 )
})
  //res.send('respond with a resource');

// router.get('/state', (req,res,next)=>{
//   var arr;
//   Shallowmitwo.find({STATE: 'UTTAR PRADESH'},(err,data)=>{
//     if(err)
//     throw err;
//     res.send(data);
//   arr=data;
// })
// console.log(data);
// })
router.get('/district/:s/:d', (req,res,next)=>{
  var s=req.params.s;
  var d=req.params.d;
  Shallowmitwo.find({STATE:s,DISTRICT:d},(err,results)=>{
      if (err) throw err;
      res.json(results);
  }
 )
});
router.get('/district/deep/:s/:d', (req,res,next)=>{
  var s=req.params.s;
  var d=req.params.d;
  Deepmitwo.find({STATE:s,DISTRICT:d},(err,results)=>{
      if (err) throw err;
      res.json(results);
  }
 )
});
router.get('/block/:s/:d/:b', (req,res,next)=>{
  var s=req.params.s;
  var d=req.params.d;
  var b=req.params.b;

  Shallowmitwo.find({STATE:s,BLOCK:b},(err,results)=>{
    if (err) throw err;
    res.json(results);
});
});
router.get('/block/deep/:s/:d/:b', (req,res,next)=>{
  var s=req.params.s;
  var d=req.params.d;
  var b=req.params.b;
  Deepmitwo.find({STATE:s,BLOCK:b},(err,results)=>{
    if (err) throw err;
    res.json(results);
});})
router.get("/filter3/state/:s",async(req,res,next)=>{
  const a=[];
  var s =req.params.s;
  await Shallowmitwo.aggregate(
    [
      { $match: {STATE:s } },
      { $group : { _id : "$DISTRICT", INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }  } }
    
    ]
  )
  // await Shallowmitwo.find({STATE:"UTTAR PRADESH"})
  .then((x)=>{
        console.log(x);
      a.push(x);
      })
  await Deepmitwo.aggregate(
    [
      { $match: {STATE:s} },
      { $group : { _id : "$DISTRICT", INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }  } }
    
    ]
  )
  .then((x)=>{
    console.log("last");
        a.push(x);   
        a.forEach((x)=>console.log(x));
        //shallow
        var shallowtotal=0,shallowinuse=0;
        a[0].forEach((y)=>{
          shallowtotal+=y.TOTAL;
          shallowinuse+=y.INUSE;
        })
        //deep
        var deeptotal=0,deepinuse=0;
        a[1].forEach((y)=>{
          deeptotal+=y.TOTAL;
          deepinuse+=y.INUSE;
        })
        console.log("shallow not in used",shallowtotal-shallowinuse);
        console.log("deep not in use",deeptotal-deepinuse);
        var b=[];
        b.push({shallowpercentage:shallowtotal/(shallowtotal+deeptotal)*100,deeppercentage:deeptotal/(shallowtotal+deeptotal)*100,shallowpercentageused:shallowinuse/(shallowtotal+deeptotal)*100,deepprecentused:deepinuse/(shallowtotal+deeptotal)*100});
        res.json(b);
      })
    
      // res.json(a);

})



router.get("/filter3/district/:s/:d",async(req,res,next)=>{
  const a=[];
  var s = req.params.s;
  var d =req.params.d;
  await Shallowmitwo.aggregate(
    [
      { $match: {STATE:s,DISTRICT:d } },
      { $group : { _id : "$BLOCK", INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }  } }
    
    ]
  )
  // await Shallowmitwo.find({STATE:"UTTAR PRADESH"})
  .then((x)=>{
        // console.log(x);
      a.push(x);
      })
  await Deepmitwo.aggregate(
    [
      { $match: {State:s,DISTRICT:d} },
      { $group : { _id : "$BLOCK",INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }   } }
    
    ]
  )
  .then((x)=>{
    console.log("last");
        a.push(x);   
        // a.forEach((x)=>console.log(x));
        //shallow
        var shallowtotal=0,shallowinuse=0;
        a[0].forEach((y)=>{
          shallowtotal+=y.TOTAL;
          shallowinuse+=y.INUSE;
        })
        //deep
        var deeptotal=0,deepinuse=0;
        a[1].forEach((y)=>{
          deeptotal+=y.TOTAL;
          deepinuse+=y.INUSE;
        })
        console.log("shallow not in used",shallowtotal-shallowinuse);
        console.log("deep not in use",deeptotal-deepinuse);
        var b=[];
        // console.log(parseInt(a[0].total));
        // console.log(parseInt(a[0].total+a[1].total));
        // console.log(a[0].total/(a[0].total+a[1].total));
        b.push({shallowpercentage:shallowtotal/(shallowtotal+deeptotal)*100,deeppercentage:deeptotal/(shallowtotal+deeptotal)*100,shallowpercentageused:shallowinuse/(shallowtotal+deeptotal)*100,deepprecentused:deepinuse/(shallowtotal+deeptotal)*100});
        res.json(b);
      })
    
      // res.json(a);

})
router.get("/filter3/:s/:b", async (req,res,next)=>{
  // console.log(req.query.state,req.query.district,req.query.block);
  const a=[];
  var s=req.params.s;
  var b=req.params.b;
  await Shallowmitwo.find({STATE:s,DISTRICT:"LUCKNOW",BLOCK:b})
  .then((x)=>{
        // console.log(x);
      a.push(x);
      })
  await Deepmitwo.find({STATE:s,DISTRICT:"LUCKNOW",BLOCK:b})
  .then((x)=>{
    console.log("last");
        a.push(x);   
        // a.forEach((x)=>console.log(x));
        //shallow
        var shallowtotal=0,shallowinuse=0;
        a[0].forEach((y)=>{
          shallowtotal+=y.TOTAL;
          shallowinuse+=y.INUSE;n
        })
        //deep
        var deeptotal=0,deepinuse=0;
        a[1].forEach((y)=>{
          deeptotal+=y.TOTAL;
          deepinuse+=y.INUSE;
        })
        console.log("shallow not in used",shallowtotal-shallowinuse);
        console.log("deep not in use",deeptotal-deepinuse);
        var b=[];
        // console.log(parseInt(a[0].total));
        // console.log(parseInt(a[0].total+a[1].total));
        // console.log(a[0].total/(a[0].total+a[1].total));
        b.push({shallowpercentage:shallowtotal/(shallowtotal+deeptotal)*100,deeppercentage:deeptotal/(shallowtotal+deeptotal)*100,shallowpercentageused:shallowinuse/(shallowtotal+deeptotal)*100,deepprecentused:deepinuse/(shallowtotal+deeptotal)*100});
        res.json(b);
      })
    
      // res.json(a);

});
router.get("/filter4/state/:s",async(req,res,next)=>{
  // res.send("hi");
  // Irrigationshallow.find({}).then((r)=>{
  //   res.send(r);
  // })
  var s =req.params.s;
await Irrigationshallow.aggregate(
[
  { $match: {State:s} },
//       { $group : { _id : "$District",pc:{ $divide: [ {$sum:"$TotalCreated"}, {$sum:"$TotalUtilised"}] },places: { $push: "$$ROOT" }  } }

  { $group : { _id : "$State",tc:{$sum:"$TotalCreated"},tu:{$sum:"$TotalUtilised"},places: { $push: "$$ROOT" }  } }

]
)
.then((x)=>{
res.json({"Percentage":x[0].tu/x[0].tc*100,"IPU":x[0].tu,"IPC":x[0].tc});
})
})
router.get("/filter4/district/:s/:d",async(req,res,next)=>{
  console.log("sf");
  var d =req.params.d;
  var s = req.params.s;
await Irrigationshallow.aggregate(
[
  { $match: {State:s,District:d} },
//       { $group : { _id : "$District",pc:{ $divide: [ {$sum:"$TotalCreated"}, {$sum:"$TotalUtilised"}] },places: { $push: "$$ROOT" }  } }

  { $group : { _id : "$District",tc:{$sum:"$TotalCreated"},tu:{$sum:"$TotalUtilised"}  } }

]
)
.then(x=>{
res.json({"Percentage":x[0].tu/x[0].tc*100,"IPU":x[0].tu,"IPC":x[0].tc});
})

})
router.get("/filter4/block/:s/:b",async(req,res,next)=>{
  var s = req.params.s;
  var b = req.params.b;
await Irrigationshallow.aggregate(
[
  { $match: {State:s,"Block/Tehsil":b} },
//       { $group : { _id : "$District",pc:{ $divide: [ {$sum:"$TotalCreated"}, {$sum:"$TotalUtilised"}] },places: { $push: "$$ROOT" }  } }

  { $group : { _id : "$Block/Tehsil",tc:{$sum:"$TotalCreated"},tu:{$sum:"$TotalUtilised"} } }

]
)
.then(x=>{
  console.log(x[0].tu+" "+x[0].tc+" "+x[0].tu/x[0].tc);
res.json({"Percentage":(x[0].tu/x[0].tc)*100,"IPU":x[0].tu,"IPC":x[0].tc});
});

});
// ANI


// router.get('/state/:statename',async (req,res)=>{
//     console.log('ghusa hai');
//     var state=req.params.statename
//     var sumfirstdepthshallow=0;
//     var sumseconddepthshallow=0;
//     var sumthirddepthshallow=0;
//     var sumfourthdepthshallow=0;
//     var sumfifthdepthshallow=0;
//     var sumfirstdepthdeep=0;
//     var sumseconddepthdeep=0;
//     var sumthirddepthdeep=0;
//     var sumfourthdepthdeep=0;
//     var sumfifthdepthdeep=0;
//     var maxshallow,maxdeep;
//     await Shallowdepthcat.find({STATE:state}, (err,blocks)=>{
//         if (err) return err;
//         //console.log(blocks)
//         blocks.forEach((element)=>{
//             //console.log(element.FIRSTDEPTH);
//             sumfirstdepthshallow=sumfirstdepthshallow+(element.FIRSTDEPTH);
//             sumseconddepthshallow=sumseconddepthshallow+(element.SECONDDEPTH);
//             sumthirddepthshallow=sumthirddepthshallow+(element.THIRDDEPTH);
//             sumfourthdepthshallow=sumfourthdepthshallow+(element.FOURTHDEPTH);
//             sumfifthdepthshallow=sumfifthdepthshallow+(element.FIFTHDEPTH);
//             console.log(sumfirstdepthshallow);
//         })
//         var arr=[sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow]
//         maxshallow = arr.indexOf(Math.max(sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow));
//     })
//     await Deepdepthcat.find({STATE:state},(err,blocks)=>{
//         if(err) return err;

//         blocks.forEach((element)=>{
//             sumfirstdepthdeep=sumfirstdepthdeep+(element.FIRSTDEPTH);
//             sumseconddepthdeep=sumseconddepthdeep+(element.SECONDDEPTH);
//             sumthirddepthdeep=sumthirddepthdeep+(element.THIRDDEPTH);
//             sumfourthdepthdeep=sumfourthdepthdeep+(element.FOURTHDEPTH);
//             sumfifthdepthdeep=sumfifthdepthdeep+(element.FIFTHDEPTH);
//         })
//         var arr1=[sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep]
//         maxdeep=arr1.indexOf(Math.max(sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep));
//     })
//     await res.json({
//         firstdepthshallow: sumfirstdepthshallow,
//         seconddepthshallow: sumseconddepthshallow,
//         thirddepthshallow: sumthirddepthshallow,
//         fourthdepthshallow: sumfourthdepthshallow,
//         fifthdepthshallow: sumfifthdepthshallow,
//         maxshallow: shallow[maxshallow],
//         firstdepthdeep: sumfirstdepthdeep,
//         seconddepthdeep: sumseconddepthdeep,
//         thirddepthdeep: sumthirddepthdeep,
//         fourthdepthdeep: sumfourthdepthdeep,
//         fifthdepthdeep: sumfifthdepthdeep,
//         maxdeep: deep[maxdeep]
//     })
// })

// router.get('/district/:districtname',async (req,res)=>{
//     var district=req.params.districtname
//     var sumfirstdepthshallow=0;
//     var sumseconddepthshallow=0;
//     var sumthirddepthshallow=0;
//     var sumfourthdepthshallow=0;
//     var sumfifthdepthshallow=0;
//     var sumfirstdepthdeep=0;
//     var sumseconddepthdeep=0;
//     var sumthirddepthdeep=0;
//     var sumfourthdepthdeep=0;
//     var sumfifthdepthdeep=0;
//     var maxshallow,maxdeep;
//     await Shallowdepthcat.find({DISTRICT:district},(err,blocks)=>{
//         if (err) return err;
        
//         blocks.forEach((element)=>{
//             sumfirstdepthshallow+=(element.FIRSTDEPTH);
//             sumseconddepthshallow+=element.SECONDDEPTH;
//             sumthirddepthshallow+=element.THIRDDEPTH;
//             sumfourthdepthshallow+=element.FOURTHDEPTH;
//             sumfifthdepthshallow+=element.FIFTHDEPTH;
//         })
//         var arr=[sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow]
//         maxshallow = arr.indexOf(Math.max(sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow));
//     })
//     await Deepdepthcat.find({DISTRICT:district},(err,blocks)=>{
//         if(err) return err;

//         blocks.forEach((element)=>{
//             sumfirstdepthdeep+=element.FIRSTDEPTH;
//             sumseconddepthdeep+=element.SECONDDEPTH;
//             sumthirddepthdeep+=element.THIRDDEPTH;
//             sumfourthdepthdeep+=element.FOURTHDEPTH;
//             sumfifthdepthdeep+=element.FIFTHDEPTH;
//         })
//         var arr1=[sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep]
//         maxdeep=arr1.indexOf(Math.max(sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep));
//     })
//     await res.json({
//         firstdepthshallow: sumfirstdepthshallow,
//         seconddepthshallow: sumseconddepthshallow,
//         thirddepthshallow: sumthirddepthshallow,
//         fourthdepthshallow: sumfourthdepthshallow,
//         fifthdepthshallow: sumfifthdepthshallow,
//         maxshallow: shallow[maxshallow],
//         firstdepthdeep: sumfirstdepthdeep,
//         seconddepthdeep: sumseconddepthdeep,
//         thirddepthdeep: sumthirddepthdeep,
//         fourthdepthdeep: sumfourthdepthdeep,
//         fifthdepthdeep: sumfifthdepthdeep,
//         maxdeep: deep[maxdeep]
//     })
// })

// router.get('/block/:blockname',async (req,res)=>{
//     var block=req.params.blockname
//     var sumfirstdepthshallow=0;
//     var sumseconddepthshallow=0;
//     var sumthirddepthshallow=0;
//     var sumfourthdepthshallow=0;
//     var sumfifthdepthshallow=0;
//     var sumfirstdepthdeep=0;
//     var sumseconddepthdeep=0;
//     var sumthirddepthdeep=0;
//     var sumfourthdepthdeep=0;
//     var sumfifthdepthdeep=0;
//     var maxshallow,maxdeep;
//     await Shallowdepthcat.find({BLOCK:block},(err,blocks)=>{
//         if (err) return err;
        
//         blocks.forEach((element)=>{
//             sumfirstdepthshallow+=(element.FIRSTDEPTH);
//             sumseconddepthshallow+=(element.SECONDDEPTH);
//             sumthirddepthshallow+=(element.THIRDDEPTH);
//             sumfourthdepthshallow+=(element.FOURTHDEPTH);
//             sumfifthdepthshallow+=(element.FIFTHDEPTH);
//         })
//         var arr=[sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow]
//         maxshallow = arr.indexOf(Math.max(sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow));
//     })
//     await Deepdepthcat.find({BLOCK:block},(err,blocks)=>{
//         if(err) return err;

//         blocks.forEach((element)=>{
//             sumfirstdepthdeep+=(element.FIRSTDEPTH);
//             sumseconddepthdeep+=(element.SECONDDEPTH);
//             sumthirddepthdeep+=(element.THIRDDEPTH);
//             sumfourthdepthdeep+=(element.FOURTHDEPTH);
//             sumfifthdepthdeep+=(element.FIFTHDEPTH);
//         })
//         var arr1=[sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep]
//         maxdeep=arr1.indexOf(Math.max(sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep));
//     })
//     await res.json({
//         firstdepthshallow: sumfirstdepthshallow,
//         seconddepthshallow: sumseconddepthshallow,
//         thirddepthshallow: sumthirddepthshallow,
//         fourthdepthshallow: sumfourthdepthshallow,
//         fifthdepthshallow: sumfifthdepthshallow,
//         maxshallow: shallow[maxshallow],
//         firstdepthdeep: sumfirstdepthdeep,
//         seconddepthdeep: sumseconddepthdeep,
//         thirddepthdeep: sumthirddepthdeep,
//         fourthdepthdeep: sumfourthdepthdeep,
//         fifthdepthdeep: sumfifthdepthdeep,
//         maxdeep: deep[maxdeep]
//     })
// })
router.get("/filter3/c1/state/:s",async(req,res,next)=>{
  const a=[];
  var s =req.params.s;
  await Shallowmione.aggregate(
    [
      { $match: {STATE:s } },
      { $group : { _id : "$DISTRICT", INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }  } }
    
    ]
  )
  .then((x)=>{
        console.log(x);
      a.push(x);
      })
  await Shallowmione.aggregate(
    [
      { $match: {STATE:s} },
      { $group : { _id : "$DISTRICT", INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }  } }
    
    ]
  )
  .then((x)=>{
    //console.log("last");
        a.push(x);   
        a.forEach((x)=>console.log(x));
        //shallow
        var shallowtotal=0,shallowinuse=0;
        a[0].forEach((y)=>{
          shallowtotal+=y.TOTAL;
          shallowinuse+=y.INUSE;
        })
        //deep
        var deeptotal=0,deepinuse=0;
        a[1].forEach((y)=>{
          deeptotal+=y.TOTAL;
          deepinuse+=y.INUSE;
        })
        console.log("shallow not in used",shallowtotal-shallowinuse);
        console.log("deep not in use",deeptotal-deepinuse);
        var b=[];
        b.push({shallowpercentage:shallowtotal/(shallowtotal+deeptotal)*100,deeppercentage:deeptotal/(shallowtotal+deeptotal)*100,shallowpercentageused:shallowinuse/(shallowtotal+deeptotal)*100,deepprecentused:deepinuse/(shallowtotal+deeptotal)*100});
        res.json(b);
      })
    
      // res.json(a);

})



router.get("/filter3/c1/district/:s/:d",async(req,res,next)=>{
  const a=[];
  var s = req.params.s;
  var d =req.params.d;
  await Shallowmione.aggregate(
    [
      { $match: {STATE:s,DISTRICT:d } },
      { $group : { _id : "$BLOCK", INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }  } }
    
    ]
  )
  .then((x)=>{
        // console.log(x);
      a.push(x);
      })
  await Deepmione.aggregate(
    [
      { $match: {State:s,DISTRICT:d} },
      { $group : { _id : "$BLOCK",INUSE: { $sum: "$INUSE" }, TOTAL: { $sum: "$TOTAL"}, places: { $push: "$$ROOT" }   } }
    
    ]
  )
  .then((x)=>{
    console.log("last");
        a.push(x);   
        // a.forEach((x)=>console.log(x));
        //shallow
        var shallowtotal=0,shallowinuse=0;
        a[0].forEach((y)=>{
          shallowtotal+=y.TOTAL;
          shallowinuse+=y.INUSE;
        })
        //deep
        var deeptotal=0,deepinuse=0;
        a[1].forEach((y)=>{
          deeptotal+=y.TOTAL;
          deepinuse+=y.INUSE;
        })
        console.log("shallow not in used",shallowtotal-shallowinuse);
        console.log("deep not in use",deeptotal-deepinuse);
        var b=[];
        // console.log(parseInt(a[0].total));
        // console.log(parseInt(a[0].total+a[1].total));
        // console.log(a[0].total/(a[0].total+a[1].total));
        b.push({shallowpercentage:shallowtotal/(shallowtotal+deeptotal)*100,deeppercentage:deeptotal/(shallowtotal+deeptotal)*100,shallowpercentageused:shallowinuse/(shallowtotal+deeptotal)*100,deepprecentused:deepinuse/(shallowtotal+deeptotal)*100});
        res.json(b);
      })
    
      // res.json(a);

})
router.get("/filter3/c1/:s/:b", async (req,res,next)=>{
  // console.log(req.query.state,req.query.district,req.query.block);
  const a=[];
  var s=req.params.s;
  var b=req.params.b;
  await Shallowmione.find({STATE:s,DISTRICT:"LUCKNOW",BLOCK:b})
  .then((x)=>{
        // console.log(x);
      a.push(x);
      })
  await Deepmione.find({STATE:s,DISTRICT:"LUCKNOW",BLOCK:b})
  .then((x)=>{
    console.log("last");
        a.push(x);   
        // a.forEach((x)=>console.log(x));
        //shallow
        var shallowtotal=0,shallowinuse=0;
        a[0].forEach((y)=>{
          shallowtotal+=y.TOTAL;
          shallowinuse+=y.INUSE;
        })
        //deep
        var deeptotal=0,deepinuse=0;
        a[1].forEach((y)=>{
          deeptotal+=y.TOTAL;
          deepinuse+=y.INUSE;
        })
        console.log("shallow not in used",shallowtotal-shallowinuse);
        console.log("deep not in use",deeptotal-deepinuse);
        var b=[];
        // console.log(parseInt(a[0].total));
        // console.log(parseInt(a[0].total+a[1].total));
        // console.log(a[0].total/(a[0].total+a[1].total));
        b.push({shallowpercentage:shallowtotal/(shallowtotal+deeptotal)*100,deeppercentage:deeptotal/(shallowtotal+deeptotal)*100,shallowpercentageused:shallowinuse/(shallowtotal+deeptotal)*100,deepprecentused:deepinuse/(shallowtotal+deeptotal)*100});
        res.json(b);
      })
    
      // res.json(a);

});

//ANI
// var shallow={
//   0:"0-20mts",
//   1:"20-40mts",
//   2:"40-60mts",
//   3:"60-70mts",
//   4:"greaterthan70"
// }

// var deep={
//   0:"70-90mts",
//   1:"90-110mts",
//   2:"110-130mts",
//   3:"130-150mts",
//   4:"greaterthan150mts"
// }

// var ShallowdepthcatSchema= new mongo.Schema({
//   STATE: String,
//   DISTRICT: String,
//   BLOCK: String,
//   FIRSTDEPTH: Number,
//   SECONDDEPTH: Number,
//   THIRDDEPTH: Number,
//   FOURTHDEPTH: Number,
//   FIFTHDEPTH: Number,
//   TOTAL: Number
// })

// var Shallowdepthcat=mongo.model('Shallowdepthcat',ShallowdepthcatSchema)

// var DeepdepthcatSchema= new mongoose.Schema({
//   STATE: String,
//   DISTRICT: String,
//   BLOCK: String,
//   FIRSTDEPTH: Number,
//   SECONDDEPTH: Number,
//   THIRDDEPTH: Number,
//   FOURTHDEPTH: Number,
//   FIFTHDEPTH: Number,
//   TOTAL: Number
// })

// var Deepdepthcat=mongo.model('Deepdepthcat',DeepdepthcatSchema)

router.get('/state/:s',async (req,res)=>{
  console.log('ghusa hai');
  var s=req.params.s;
  var sumfirstdepthshallow=0;
  var sumseconddepthshallow=0;
  var sumthirddepthshallow=0;
  var sumfourthdepthshallow=0;
  var sumfifthdepthshallow=0;
  var sumfirstdepthdeep=0;
  var sumseconddepthdeep=0;
  var sumthirddepthdeep=0;
  var sumfourthdepthdeep=0;
  var sumfifthdepthdeep=0;
  var maxshallow,maxdeep;
  var v1=await Shallowdepthcat.find({STATE:s}).exec();
      for(const element of v1){
         // console.log('step2');
          sumfirstdepthshallow=sumfirstdepthshallow+(element.FIRSTDEPTH);
          sumseconddepthshallow=sumseconddepthshallow+(element.SECONDDEPTH);
          sumthirddepthshallow=sumthirddepthshallow+(element.THIRDDEPTH);
          sumfourthdepthshallow=sumfourthdepthshallow+(element.FOURTHDEPTH);
          sumfifthdepthshallow=sumfifthdepthshallow+(element.FIFTHDEPTH);
          console.log(sumfirstdepthshallow);
      }
      var arr=[sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow]
      maxshallow = arr.indexOf(Math.max(sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow));
  
  var v2=await Deepdepthcat.find({STATE:s}).exec();
      for(const element of v2){
         // console.log('step4')
          sumfirstdepthdeep=sumfirstdepthdeep+(element.FIRSTDEPTH);
          sumseconddepthdeep=sumseconddepthdeep+(element.SECONDDEPTH);
          sumthirddepthdeep=sumthirddepthdeep+(element.THIRDDEPTH);
          sumfourthdepthdeep=sumfourthdepthdeep+(element.FOURTHDEPTH);
          sumfifthdepthdeep=sumfifthdepthdeep+(element.FIFTHDEPTH);
      }
      var arr1=[sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep]
      maxdeep=arr1.indexOf(Math.max(sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep));
  console.log('step5')
  await res.json({
      firstdepthshallow: sumfirstdepthshallow,
      seconddepthshallow: sumseconddepthshallow,
      thirddepthshallow: sumthirddepthshallow,
      fourthdepthshallow: sumfourthdepthshallow,
      fifthdepthshallow: sumfifthdepthshallow,
      maxshallow: shallow[maxshallow],
      firstdepthdeep: sumfirstdepthdeep,
      seconddepthdeep: sumseconddepthdeep,
      thirddepthdeep: sumthirddepthdeep,
      fourthdepthdeep: sumfourthdepthdeep,
      fifthdepthdeep: sumfifthdepthdeep,
      maxdeep: deep[maxdeep]
  })
})
router.get('/filter10/district/:s/:d',async (req,res)=>{
  var d=req.params.d;
  var s =req.params.s;
  var sumfirstdepthshallow=0;
  var sumseconddepthshallow=0;
  var sumthirddepthshallow=0;
  var sumfourthdepthshallow=0;
  var sumfifthdepthshallow=0;
  var sumfirstdepthdeep=0;
  var sumseconddepthdeep=0;
  var sumthirddepthdeep=0;
  var sumfourthdepthdeep=0;
  var sumfifthdepthdeep=0;
  var maxshallow,maxdeep;
  var v1=await Shallowdepthcat.find({STATE:s,DISTRICT:d}).exec()
      
      for(element of v1){
          sumfirstdepthshallow+=(element.FIRSTDEPTH);
          sumseconddepthshallow+=element.SECONDDEPTH;
          sumthirddepthshallow+=element.THIRDDEPTH;
          sumfourthdepthshallow+=element.FOURTHDEPTH;
          sumfifthdepthshallow+=element.FIFTHDEPTH;
      }
      var arr=[sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow]
      maxshallow = arr.indexOf(Math.max(sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow));

  var v2=await Deepdepthcat.find({STATE:s,DISTRICT:d}).exec()
      for(element of v2){
          sumfirstdepthdeep+=element.FIRSTDEPTH;
          sumseconddepthdeep+=element.SECONDDEPTH;
          sumthirddepthdeep+=element.THIRDDEPTH;
          sumfourthdepthdeep+=element.FOURTHDEPTH;
          sumfifthdepthdeep+=element.FIFTHDEPTH;
      }
      var arr1=[sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep]
      maxdeep=arr1.indexOf(Math.max(sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep));
  
  await res.json({
      firstdepthshallow: sumfirstdepthshallow,
      seconddepthshallow: sumseconddepthshallow,
      thirddepthshallow: sumthirddepthshallow,
      fourthdepthshallow: sumfourthdepthshallow,
      fifthdepthshallow: sumfifthdepthshallow,
      maxshallow: shallow[maxshallow],
      firstdepthdeep: sumfirstdepthdeep,
      seconddepthdeep: sumseconddepthdeep,
      thirddepthdeep: sumthirddepthdeep,
      fourthdepthdeep: sumfourthdepthdeep,
      fifthdepthdeep: sumfifthdepthdeep,
      maxdeep: deep[maxdeep]
  })
})


router.get('/block/:s/:b',async (req,res)=>{
  var b=req.params.b;
  var s=req.params.s;
  var sumfirstdepthshallow=0;
  var sumseconddepthshallow=0;
  var sumthirddepthshallow=0;
  var sumfourthdepthshallow=0;
  var sumfifthdepthshallow=0;
  var sumfirstdepthdeep=0;
  var sumseconddepthdeep=0;
  var sumthirddepthdeep=0;
  var sumfourthdepthdeep=0;
  var sumfifthdepthdeep=0;
  var maxshallow,maxdeep;
  var v1=await Shallowdepthcat.find({STATE:s,BLOCK:b}).exec();  
  for(const element of v1){
          sumfirstdepthshallow+=(element.FIRSTDEPTH);
          sumseconddepthshallow+=(element.SECONDDEPTH);
          sumthirddepthshallow+=(element.THIRDDEPTH);
          sumfourthdepthshallow+=(element.FOURTHDEPTH);
          sumfifthdepthshallow+=(element.FIFTHDEPTH);
      }
      var arr=[sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow]
      maxshallow = arr.indexOf(Math.max(sumfirstdepthshallow,sumseconddepthshallow,sumthirddepthshallow,sumfourthdepthshallow,sumfifthdepthshallow));
  
  var v2=await Deepdepthcat.find({STATE:s,BLOCK:b}).exec();
  for(const element of v2){
          sumfirstdepthdeep+=(element.FIRSTDEPTH);
          sumseconddepthdeep+=(element.SECONDDEPTH);
          sumthirddepthdeep+=(element.THIRDDEPTH);
          sumfourthdepthdeep+=(element.FOURTHDEPTH);
          sumfifthdepthdeep+=(element.FIFTHDEPTH);
      }
      var arr1=[sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep]
      maxdeep=arr1.indexOf(Math.max(sumfirstdepthdeep,sumseconddepthdeep,sumthirddepthdeep,sumfourthdepthdeep,sumfifthdepthdeep));

  await res.json({
      firstdepthshallow: sumfirstdepthshallow,
      seconddepthshallow: sumseconddepthshallow,
      thirddepthshallow: sumthirddepthshallow,
      fourthdepthshallow: sumfourthdepthshallow,
      fifthdepthshallow: sumfifthdepthshallow,
      maxshallow: shallow[maxshallow],
      firstdepthdeep: sumfirstdepthdeep,
      seconddepthdeep: sumseconddepthdeep,
      thirddepthdeep: sumthirddepthdeep,
      fourthdepthdeep: sumfourthdepthdeep,
      fifthdepthdeep: sumfifthdepthdeep,
      maxdeep: deep[maxdeep]
  })
})




function linearRegression(independent, dependent)
  {
      let lr = {};
    //console.log("a");
      let independent_mean = arithmeticMean(independent);
      let dependent_mean = arithmeticMean(dependent);
      let products_mean = meanOfProducts(independent, dependent);
      let independent_variance = variance(independent);
  
      lr.a = (products_mean - (independent_mean * dependent_mean) ) / independent_variance;
  
      lr.b = dependent_mean - (lr.a * independent_mean);
  
      return lr;
  }
  
  function arithmeticMean(data)
  {
      let total = 0;
  
      // note that incrementing total is done within the for loop
      for(let i = 0, l = data.length; i < l; total += data[i], i++);
  
      return total / data.length;
  }
  
  
  function meanOfProducts(data1, data2)
  {
      let total = 0;
      //console.log("b");

      // note that incrementing total is done within the for loop
      for(let i = 0, l = data1.length; i < l; total += (data1[i] * data2[i]), i++);
  
      return total / data1.length;
  }
   function variance(data)
  {
      let squares = [];
     // console.log("c");

      for(let i = 0, l = data.length; i < l; i++)
      {
          squares[i] = Math.pow(data[i], 2);
      }
  
      let mean_of_squares = arithmeticMean(squares);
      let mean = arithmeticMean(data);
      let square_of_mean = Math.pow(mean, 2);
      let variance = mean_of_squares - square_of_mean;
  
      return variance;
  }
  var ans = (x,ind,dep)=>
  {
    console.log(dep);
    //console.log("d");
      // let independent = [10,20,40,45,60,65,75,80];
      // let dependent = [32,44,68,74,92,98,110,116];
      let lr = linearRegression(ind,dep);
     // var integer = parseInt(x,10);
   //  console.log("x=",x,"lr=",lr);
      var ans = lr.a*x+lr.b;
      return ans;
  }
router.get('/pred/water/tubewell/:s/:b/:year', (req,res,next)=>{
  console.log("Sd");
  var s=req.params.s;
  var b=req.params.b;
  var year = req.params.year;
  var t,d;
  var indt=[];
  var dept=[];
  //Tubewell
  
  Waterlevelprediction.find({STATE : s , BLOCK_NAME : b, SITE_TYPE : "Tube Well" },function(err,wp){
    wp.forEach(function(x) {
      var xx=x.toObject();
      indt.push(xx.YEAR_OBS);
      dept.push(xx.AVG)
    });
  }).then(()=>{
    console.log(indt, dept);
  var y = ans(year,indt,dept);
  res.json({"x":indt,"y":dept,"tubewell": ans(year,indt,dept)});
  }
)
})
router.get('/pred/water/dugwell/:s/:b/:year', (req,res,next)=>{
  console.log("Sd");
  var s=req.params.s;
  var b=req.params.b;
  var year = req.params.year;
var indd=[];
var depd=[];
//Dugwell

Waterlevelprediction.find({STATE : s , BLOCK_NAME : b, SITE_TYPE : "Dug Well" },function(err,wp){
  wp.forEach(function(x) {
    var xx=x.toObject();
    indd.push(xx.YEAR_OBS);
    depd.push(xx.AVG)
  });
  
}).then(()=>{
  console.log(indd,depd);
//  var y = ans(year,indd,depd);
 // console.log(y);
//  d=y;
  res.json({"x":indd,"y":depd,"dugwell": ans(year,indd,depd)});
});
});

router.get('/pred/depth/:s/:b/:year', (req,res,next)=>{
  var s=req.params.s;
  var b=req.params.b;
  var x = req.params.year;
  var ind =[2006,2013];
  var dep=[];
  console.log("SD");
  Depthlevelprediction.find({STATE:s , BLOCK:b},(err,results)=>{
    console.log(results);
    var xx=results[0].toObject();
    dep.push(xx.avg4);
    dep.push(xx.avg5);
}).then(()=>{
  console.log(dep);
var y = ans(x,ind,dep);
  res.json({"x":ind,"y":dep,"ans":y});
});
})

router.get('/pred/tubewells/:s/:b/:year', (req,res,next)=>{

  var s=req.params.s;
  var b=req.params.b;
  var x = req.params.year;
  var ind =[2006,2013];
  var dep=[];
  console.log("SD");
  Depthlevelprediction.find({STATE:s , BLOCK:b},(err,results)=>{
    console.log(results);
    var xx=results[0].toObject();
    dep.push(xx.totalwell4);
    dep.push(xx.totalwell5);
}).then(()=>{
  console.log(dep);
var y = ans(x,ind,dep);
res.json({"x":ind,"y":dep,"ans":y});
 });
});
router.get('/pred/dugwells/depth/:s/:b/:year', (req,res,next)=>{
  var s=req.params.s;
  var b=req.params.b;
  console.log(s,b);
  var x = req.params.year;
  var ind =[2006,2013];
  var dep=[];
  console.log("SD");
  Dugwellprediction.find({},(err,results)=>{
    console.log(results);
    var xx=results[0].toObject();
    dep.push(xx.AVG4);
    dep.push(xx.AVG5);
}).then(()=>{
  console.log(dep);
var y = ans(x,ind,dep);
res.json({"x":ind,"y":dep,"ans":y});
 });
});
router.get('/pred/dugwells/number/:s/:b/:year', (req,res,next)=>{
  var s=req.params.s;
  var b=req.params.b;
  var x = req.params.year;
  var ind =[2006,2013];
  var dep=[];
  console.log("SD");
  Dugwellprediction.find({STATE:s , BLOCK:b},(err,results)=>{
    console.log(results);
    var xx=results[0].toObject();
    dep.push(xx.TOTAL4);
    dep.push(xx.TOTAL5);
}).then(()=>{
  console.log(dep);
var y = ans(x,ind,dep);
res.json({"x":ind,"y":dep,"ans":y});
 });
});
module.exports = router;