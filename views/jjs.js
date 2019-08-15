var map1 = L.map('mapid', {
    maxZoom: 50,
    minZoom: 4,

}).setView([27.1760576, 77.758213],4);
  
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
               'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
     }).addTo(map1);

     const sort_fun= (x,y) => {
        console.log("Sort func");
        var nx=[],ny=[];
          x.forEach((z)=>{
            nx.push(z);
          })
          nx.sort();
          console.log("X=",x);
          console.log("NX=",nx);
          for(a in nx)
          {
            for(b in y)
            {
              if(x[b]===nx[a])
              {
                ny.push(y[b]);
              }
            }
          }
          console.log("nx in sort",nx);
          console.log("ny in sort",ny);
          return [nx,ny];
      }
function S1() {
    var xx =document.getElementById('sstate');
      map1.remove();

      var map = L.map('mapid', {
        maxZoom: 50,
        minZoom: 4,
    
    }).setView([27.1760576, 77.758213],4);
    var xxx=xx.options[xx.selectedIndex].text;
      
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets'
         }).addTo(map);
           axios.get('http://localhost:3000/api/'+xxx)
               .then(response => {
                   response.data.forEach((x)=>{
                       var block=x._id;
                       var inuse=x.inuse;
                       var total=x.total;
                       console.log(block, inuse, total);
                   axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${block}&format=json&limit=1`,{
                       inuse,
                       total
                   })
               .then((response) => {
                   if(response.data.length!==0)
                   {
                   //console.log(total);
                   //console.log(inuse);
                   //console.log(response.data[0]);
                   var lat=response.data[0].lat;
                   var long=response.data[0].lon;
                   var marker = L.marker([lat, long],{fillColor:'red'}).addTo(map);
                   marker.bindPopup("<b>SHALLOW TUBEWELLS</b><br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();

                   }
               })
               .catch(error => {
                   console.log(error);
               });

                   })
                
           })
           .catch(error=>{
               console.log(error);
           })
           axios.get('http://localhost:3000/api/deep/'+xxx)
               .then(response => {
                   response.data.forEach((x)=>{
                       var block=x._id;
                       var inuse=x.inuse;
                       var total=x.total;
                       console.log(block, inuse, total);
                   axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${block}&format=json&limit=1`,{
                       inuse,
                       total
                   })
               .then((response) => {
                   if(response.data.length!==0)
                   {
                   //console.log(total);
                   //console.log(inuse);
                   //console.log(response.data[0]);
                   var lat=response.data[0].lat;
                   var long=response.data[0].lon;
                   var circle = L.circle([lat,long], {
                   color: 'red',
                   fillColor: '#f03',
                   fillOpacity: 0.5,
                   radius: 20000
                   }).addTo(map);
                   circle.bindPopup("<b>DEEP TUBEWELLS</b><br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();
                   }

               })
               .catch(error => {
                   console.log(error);
               });

                   })
                
           })
           .catch(error=>{
               console.log(error);
           })
           map1=map;
       }
       
       var S2=()=>{

      map1.remove();
      var xx=document.getElementById('sstate');
      var map = L.map('mapid', {
        maxZoom: 50,
        minZoom: 4,
    
    }).setView([27.1760576, 77.758213],4);
      var xxx=xx.options[xx.selectedIndex].text;
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets'
         }).addTo(map);

        axios.get('http://localhost:3000/api/filter2/'+xxx)
        .then(response => {
            response.data.forEach((x)=>{
                    var block=x.BLOCK;
                    var census1=x.CENSUS1;
                    var census2=x.CENSUS2;
                    //console.log(block, inuse, total);
                axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${block}&format=json&limit=1`,{
                    census1,
                    census2,
                    block
                })
            .then((response) => {
                if(response.data.length!==0)
                {
                var lat=response.data[0].lat;
                var long=response.data[0].lon;
                var marker = L.marker([lat, long]).addTo(map);
                var k = ((Math.abs(census2-census1))/census1)*100;
                k=k.toPrecision(4);
                marker.bindPopup("<b>BLOCK:</b>"+block+"</br><b>PERCENT INCREASE:</b></br><b><b>"+k+"</b></b><br>").openPopup();
                }
            })
            .catch(error => {
                console.log(error);
            });

                })
                })
        .catch(error=>{
            console.log(error);
        })
        map1=map;

     }
     var S3=()=>{

        map1.remove();
        var xx=document.getElementById('sstate');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
        var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/filter3/state/'+xxx)
          .then(response => {
              response.data.forEach((x)=>{
                var shall = x.shallowpercentage	;
                var deep=   x.deeppercentage;
                var shallu =  x.shallowpercentageused	;
                var deepu=    x.deepprecentused
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&format=json&limit=1`,{
                    shall,
                    deep,
                    shallu,
                    deepu
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  shall = shall.toPrecision(4);
                  deep  = deep.toPrecision(4);
                  shallu= shallu.toPrecision(4);
                  deepu= deepu.toPrecision(4);
                  marker.bindPopup("<b>% OF SHALLOW TUBEWELLS:</b>"+shall+"</br><b>% OF DEEP TUBEWELLS:</b>"+deep+"</br><b>% OF SHALLOW TUBEWELLS USED:</b>"+shallu+"</br><b>% OF DEEP TUBEWELLS USED:</b>"+deepu+"</br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
       }

       var S4=()=>{

        map1.remove();
        var xx=document.getElementById('sstate');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
       var xxx=xx.options[xx.selectedIndex].text; 
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/state/'+xxx)
          .then(response => {
                      var maxshallow=response.data.maxshallow;
                      var maxdeep=response.data.maxdeep;
                      console.log(response.data);
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&format=json&limit=1`,{
                      maxshallow,
                      maxdeep
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  marker.bindPopup("<b>MOST TAPPED IN SHALLOW REGION :</b>"+maxshallow+"</br><b>MOST TAPPED IN DEEP REGION:</b></br>"+maxdeep+"<br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
  
       }

     
       var S5=()=>{

        map1.remove();
        var xx=document.getElementById('sstate');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
      var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/filter4/state/'+xxx)
          .then(response => {
                      var Percentage=response.data.Percentage;
                      var IPU=response.data.IPU;
                      var ICU=response.data.IPC;
                      if(IPU==undefined)
                        IPU=0;
                        if(ICU==undefined)
                        ICU=0;
                      console.log(response.data);
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&format=json&limit=1`,{
                    Percentage,
                    IPU,
                    ICU
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  marker.bindPopup("<b>IPU :</b>"+IPU+"</br><b>ICU :</b>"+ICU+"</br><br><b>IPU vs ICU:</b></br>"+Percentage+"<br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
  
       }

     var D1=()=>{

        var xx=document.getElementById('dsstate');
        var yy=document.getElementById('ddistrict');
      map1.remove();

      var map = L.map('mapid', {
        maxZoom: 50,
        minZoom: 4,
    
    }).setView([27.1760576, 77.758213],4);
      var xxx=xx.options[xx.selectedIndex].text;
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets'
         }).addTo(map);
            axios.get('http://localhost:3000/api/district/'+xxx+"/"+yy.value)
                .then(response => {
                    response.data.forEach((x)=>{
                        var block=x.BLOCK;
                        var inuse=x.INUSE;
                        var total=x.TOTAL;
                        console.log(block, inuse, total);
                    axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${block}&format=json&limit=1`,{
                        inuse,
                        total
                    })
                .then((response) => {
                    if(response.data.length!==0)
                    {
                    console.log(total);
                    console.log(inuse);
                    console.log(response.data[0]);
                    var lat=response.data[0].lat;
                    var long=response.data[0].lon;
                    var marker = L.marker([lat, long]).addTo(map);
                    marker.bindPopup("<b>SHALLOW TUBEWELLS</b><br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();
                    }

                })
                .catch(error => {
                    console.log(error);
                });

                    })
                 
            })
            .catch(error=>{
                console.log(error);
            })
            axios.get('http://localhost:3000/api/district/deep/'+xxx+'/'+yy.value)
                .then(response => {
                    response.data.forEach((x)=>{
                        var block=x.BLOCK;
                        var inuse=x.INUSE;
                        var total=x.TOTAL;
                        console.log(block, inuse, total);
                    axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${block}&format=json&limit=1`,{
                        inuse,
                        total
                    })
                .then((response) => {
                    if(response.data.length!==0)
                    {
                    console.log(total);
                    console.log(inuse);
                    console.log(response.data[0]);
                    var lat=response.data[0].lat;
                    var long=response.data[0].lon;
                    var circle = L.circle([lat,long], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 20000
                    }).addTo(map);
                    circle.bindPopup("<b>DEEP TUBEWELLS</b><br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();
                    }


                })
                .catch(error => {
                    console.log(error);
                });

                    })
                 
            })
            .catch(error=>{
                console.log(error);
            })
            map1=map;
     }
     var D3=()=>{

        map1.remove();
        var xx=document.getElementById('dsstate');
        var yy = document.getElementById('ddistrict');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
        var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/filter3/district/'+xxx+'/'+yy.value)
          .then(response => {
              response.data.forEach((x)=>{
                var shall = x.shallowpercentage	;
                var deep=   x.deeppercentage;
                var shallu =  x.shallowpercentageused	;
                var deepu=    x.deepprecentused
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${yy.value}&format=json&limit=1`,{
                    shall,
                    deep,
                    shallu,
                    deepu
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  shall = shall.toPrecision(4);
                  deep  = deep.toPrecision(4);
                  shallu= shallu.toPrecision(4);
                  deepu= deepu.toPrecision(4);
                  marker.bindPopup("<b>% OF SHALLOW TUBEWELLS:</b>"+shall+"</br><b>% OF DEEP TUBEWELLS:</b>"+deep+"</br><b>% OF SHALLOW TUBEWELLS USED:</b>"+shallu+"</br><b>% OF DEEP TUBEWELLS USED:</b>"+deepu+"</br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
       }
       var D4=()=>{

        map1.remove();
        var xx=document.getElementById('dsstate');
        var yy = document.getElementById('ddistrict');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
        var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/filter10/district/'+xxx+"/"+yy.value)
          .then(response => {
                      var maxshallow=response.data.maxshallow;
                      var maxdeep=response.data.maxdeep;
                      console.log(response.data);
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${yy.value}&format=json&limit=1`,{
                      maxshallow,
                      maxdeep
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  marker.bindPopup("<b>MOST TAPPED IN SHALLOW REGION :</b>"+maxshallow+"</br><b>MOST TAPPED IN DEEP REGION:</b></br>"+maxdeep+"<br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
  
       }
     
       var D5=()=>{

        map1.remove();
        var xx=document.getElementById('dsstate');
        var yy = document.getElementById('ddistrict');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
      var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/filter4/district/'+xxx+"/"+yy.value)
          .then(response => {
                      var Percentage=response.data.Percentage;
                      var IPU=response.data.IPU;
                      var ICU=response.data.IPC;
                      if(IPU==undefined)
                        IPU=0;
                        if(ICU==undefined)
                        ICU=0;
                      console.log(response.data);
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${yy.value}&format=json&limit=1`,{
                    Percentage,
                    IPU,
                    ICU
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  marker.bindPopup("<b>IPU :</b>"+IPU+"</br><b>ICU :</b>"+ICU+"</br><br><b>IPU vs ICU:</b></br>"+Percentage+"<br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
       }
       
     var B1=()=>{
        map1.remove();
        var xx = document.getElementById('bsstate');
        var yy = document.getElementById('bddistrict');
        var zz = document.getElementById('bblock');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
        var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
        axios.get('http://localhost:3000/api/block/'+xxx+"/"+yy.value+"/"+zz.value)
        .then(response => {
            response.data.forEach((x)=>{
                var block=x.BLOCK;
                var inuse=x.INUSE;
                var total=x.TOTAL;
                console.log(block, inuse, total);
            axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${block}&format=json&limit=1`,{
                inuse,
                total
            })
        .then((response) => {
            if(response.data.length!==0)
            {
            console.log(total);
            console.log(inuse);
            console.log(response.data[0]);
            var lat=response.data[0].lat;
            var long=response.data[0].lon;
            var marker = L.marker([lat, long]).addTo(map);
            marker.bindPopup("<b>SHALLOW TUBEWELLS</b></br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();
            }

        })
        .catch(error => {
            console.log(error);
        });

            })
         
    })
    .catch(error=>{
        console.log(error);
    })
    axios.get('http://localhost:3000/api/block/deep/'+xxx+'/'+yy.value+'/'+zz.value)
        .then(response => {
            response.data.forEach((x)=>{
                var block=x.BLOCK;
                var inuse=x.INUSE;
                var total=x.TOTAL;
                console.log(block, inuse, total);
            axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${zz.value}&format=json&limit=1`,{
                inuse,
                total
            })
        .then((response) => {
            if(response.data.length!==0)
            {
            console.log(total);
            console.log(inuse);
            console.log(response.data[0]);
            var lat=response.data[0].lat;
            var long=response.data[0].lon;
            var circle = L.circle([lat,long], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 20000
            }).addTo(map);
            circle.bindPopup("<b>DEEP TUBEWELLS</b><br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();
            }

        })
        .catch(error => {
            console.log(error);
        });

            })
         
    })
    .catch(error=>{
        console.log(error);
    })
    map1=map;
     }
       var B3=()=>{
        map1.remove();
        var xx=document.getElementById('bsstate');
        var yy = document.getElementById('bddistrict');
        var zz= document.getElementById('bblock');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      }).setView([27.1760576, 77.758213],4);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  var xxx=xx.options[xx.selectedIndex].text;
          axios.get('http://localhost:3000/api/filter3/'+xxx+'/'+zz.value)
          .then(response => {
              response.data.forEach((x)=>{
                var shall = x.shallowpercentage	;
                var deep=   x.deeppercentage;
                var shallu =  x.shallowpercentageused	;
                var deepu=    x.deepprecentused
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${zz.value}&format=json&limit=1`,{
                    shall,
                    deep,
                    shallu,
                    deepu
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  shall = shall.toPrecision(4);
                  deep  = deep.toPrecision(4);
                  shallu= shallu.toPrecision(4);
                  deepu= deepu.toPrecision(4);
                  marker.bindPopup("<b>% OF SHALLOW TUBEWELLS:</b>"+shall+"</br><b>% OF DEEP TUBEWELLS:</b>"+deep+"</br><b>% OF SHALLOW TUBEWELLS USED:</b>"+shallu+"</br><b>% OF DEEP TUBEWELLS USED:</b>"+deepu+"</br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
                  })
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
       }
       var B4=()=>{

        map1.remove();
        var xx=document.getElementById('bsstate');
        var yy = document.getElementById('bddistrict');
        var zz= document.getElementById('bblock');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
        var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/block/'+xxx+"/"+zz.value)
          .then(response => {
                      var maxshallow=response.data.maxshallow;
                      var maxdeep=response.data.maxdeep;
                      console.log(response.data);
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${zz.value}&format=json&limit=1`,{
                      maxshallow,
                      maxdeep
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  marker.bindPopup("<b>MOST TAPPED IN SHALLOW REGION :</b>"+maxshallow+"</br><b>MOST TAPPED IN DEEP REGION:</b></br>"+maxdeep+"<br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
  
       }

       var B6=()=>{

        map1.remove();
        var xx=document.getElementById('bsstate');
        var yy = document.getElementById('bddistrict');
        var zz= document.getElementById('bblock');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
      var xxx=xx.options[xx.selectedIndex].text;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
  
          axios.get('http://localhost:3000/api/filter4/block/'+xxx+"/"+zz.value)
          .then(response => {
                      var Percentage=response.data.Percentage;
                      var IPU=response.data.IPU;
                      var ICU=response.data.IPC;
                      console.log(IPU); console.log(ICU);
                      if(IPU==undefined)
                        IPU=0;
                        if(ICU==undefined)
                        ICU=0;
                      console.log(response.data);
                      //console.log(block, inuse, total);
                  axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${xxx}&city=${zz.value}&format=json&limit=1`,{
                    Percentage,
                    IPU,
                    ICU
                  })
              .then((response) => {
                  if(response.data.length!==0)
                  {
                  var lat=response.data[0].lat;
                  var long=response.data[0].lon;
                  console.log(lat);
                  var marker = L.marker([lat, long]).addTo(map);
                  marker.bindPopup("<b>IPU :</b>"+IPU+"</br><b>ICU :</b>"+ICU+"</br><br><b>IPU vs ICU:</b></br>"+Percentage+"<br>").openPopup();
                  }
              })
              .catch(error => {
                  console.log(error);
              });
  
                  })
          .catch(error=>{
              console.log(error);
          })
          map1=map;
       }

//Water level
       var B5=()=>{
        var xx=document.getElementById('bsstate');
        var yy = document.getElementById('bddistrict');
        var zz= document.getElementById('bblock');
        var xxx=xx.options[xx.selectedIndex].text;
        var year =document.getElementById('year');
        axios.get('http://localhost:3000/api/pred/water/tubewell/'+xxx+"/"+zz.value+"/"+year.value).then(response =>{
 if(response.data.length!==0)
                  {
                  console.log(response);
                  var tw = response.data.tubewell;
                  var x=response.data.x;
                  var y=response.data.y;
                  x.push(year.value);
                  y.push(tw);
                  [x,y]=sort_fun(x,y);
                  console.log(x);
                  console.log(y);

                  //document.getElementById("pwater").innerHTML="Tubewell Predicted Water Level = "+tw;
                 
Highcharts.chart('container', {
    title: {
        text: "Tubewell Predicted Water Level"
    },

    subtitle: {
        text: tw
    },


    xAxis: {
        categories:x
    },

    series: [{
        data: y
    }]
});
                  }
              })
              .catch(error => {
                  console.log(error);
              });
            }
//Depth level
       var B7=()=>{
        var xx=document.getElementById('bsstate');
        var yy = document.getElementById('bddistrict');
        var zz= document.getElementById('bblock');
        var xxx=xx.options[xx.selectedIndex].text;
        var year =document.getElementById('year2');
        axios.get('http://localhost:3000/api/pred/depth/'+xxx+"/"+zz.value+"/"+year.value).then(response =>{
                if(response.data.length!==0)
                  {
                  var tw = response.data.ans;
                  console.log(tw);
                  //document.getElementById("pwater").innerHTML="Predicted Depth Level = "+tw;
                  var x=response.data.x;
                  var y=response.data.y;
                  x.push(year.value);
                  y.push(tw);
                  [x,y]=sort_fun(x,y);
                  console.log(x);
                  console.log(y);
                  Highcharts.chart('container', {
                    title: {
                        text: 'Predicted Depth Level'
                    },
                
                    subtitle: {
                        text: tw
                    },
                
                
                    xAxis: {
                        categories:x
                    },
                
                    series: [{
                        data: y
                    }]
                });
                  }
              })
              .catch(error => {
                  console.log(error);
              });
            }
            var B8=()=>{
                var xx=document.getElementById('bsstate');
                var yy = document.getElementById('bddistrict');
                var zz= document.getElementById('bblock');
                var xxx=xx.options[xx.selectedIndex].text;
                var year =document.getElementById('year3');
                axios.get('http://localhost:3000/api/pred/tubewells/'+xxx+"/"+zz.value+"/"+year.value).then(response =>{
                        if(response.data.length!==0)
                          {
                          var tw = response.data.ans;
                          console.log(tw);
                          //document.getElementById("pwater").innerHTML="Predicted number of tubewells = "+tw;
                          var x=response.data.x;
                  var y=response.data.y;
                  x.push(year.value);
                  y.push(tw);
                  [x,y]=sort_fun(x,y);
                  console.log(x);
                  console.log(y);
                  Highcharts.chart('container', {
                    title: {
                        text: 'Predicted number of tubewells'
                    },
                
                    subtitle: {
                        text: tw
                    },
                
                
                    xAxis: {
                        categories:x
                    },
                
                    series: [{
                        data: y
                    }]
                });
                          }
                      })
                      .catch(error => {
                          console.log(error);
                      });
                    }

                    var B9=()=>{
                        var xx=document.getElementById('bsstate');
                        var yy = document.getElementById('bddistrict');
                        var zz= document.getElementById('bblock');
                        var xxx=xx.options[xx.selectedIndex].text;
                        var year =document.getElementById('year4');
                        axios.get('http://localhost:3000/api/pred/dugwells/depth/'+xxx+"/"+zz.value+"/"+year.value).then(response =>{
                                if(response.data.length!==0)
                                  {
                                  var tw = response.data.ans;
                                  console.log(tw);
                                  //document.getElementById("pwater").innerHTML="Predicted depth of dugwells = "+tw;
                                  var x=response.data.x;
                  var y=response.data.y;
                  x.push(year.value);
                  y.push(tw);
                  [x,y]=sort_fun(x,y);
                  console.log(x);
                  console.log(y);
                  Highcharts.chart('container', {
                    title: {
                        text: 'Predicted depth of dugwells'
                    },
                
                    subtitle: {
                        text: tw
                    },
                
                
                    xAxis: {
                        categories:x
                    },
                
                    series: [{
                        data: y
                    }]
                });
                                  }
                              })
                              .catch(error => {
                                  console.log(error);
                              });
                            }

                            var B10=()=>{
                                var xx=document.getElementById('bsstate');
                                var yy = document.getElementById('bddistrict');
                                var zz= document.getElementById('bblock');
                                var xxx=xx.options[xx.selectedIndex].text;
                                var year =document.getElementById('year5');
                                axios.get('http://localhost:3000/api/pred/dugwells/number/'+xxx+"/"+zz.value+"/"+year.value).then(response =>{
                                        if(response.data.length!==0)
                                          {
                                          var tw = response.data.ans;
                                          console.log(tw);
                                          //document.getElementById("pwater").innerHTML="Predicted number of dugwells = "+tw;
                                          var x=response.data.x;
                                                        var y=response.data.y;
                                                        x.push(year.value);
                                                        y.push(tw);
                                                        [x,y]=sort_fun(x,y);
                                                        console.log(x);
                                                        console.log(y);
                                                        Highcharts.chart('container', {
                                                            title: {
                                                                text: 'Predicted number of dugwells'
                                                            },
                                                        
                                                            subtitle: {
                                                                text: tw
                                                            },
                                                        
                                                        
                                                            xAxis: {
                                                                categories:x
                                                            },
                                                        
                                                            series: [{
                                                                data: y
                                                            }]
                                                        });
                                          }
                                      })
                                      .catch(error => {
                                          console.log(error);
                                      });
                                    }
                                    var B11=()=>{
                                        var xx=document.getElementById('bsstate');
                                        var yy = document.getElementById('bddistrict');
                                        var zz= document.getElementById('bblock');
                                        var xxx=xx.options[xx.selectedIndex].text;
                                        var year =document.getElementById('year6');
                                        axios.get('http://localhost:3000/api/pred/water/dugwell/'+xxx+"/"+zz.value+"/"+year.value).then(response =>{
                                                if(response.data.length!==0)
                                                  {
                                                  var tw = response.data.dugwell;
                                                  console.log(tw);
                                                 // document.getElementById("pwater").innerHTML="Predicted water level of dugwells = "+tw;
                                                  var x=response.data.x;
                  var y=response.data.y;
                  x.push(year.value);
                  y.push(tw);
                  [x,y]=sort_fun(x,y);
                  console.log(x);
                  console.log(y);
                  Highcharts.chart('container', {
                    title: {
                        text: 'Predicted water level of dugwells'
                    },
                
                    subtitle: {
                        text: tw
                    },
                
                
                    xAxis: {
                        categories:x
                    },
                
                    series: [{
                        data: y
                    }]
                });
                                                  }
                                              })
                                              .catch(error => {
                                                  console.log(error);
                                              });
                                            }
var P1=()=>{
        map1.remove();
        var xx = document.getElementById('pinn');
        var map = L.map('mapid', {
          maxZoom: 50,
          minZoom: 4,
      
      }).setView([27.1760576, 77.758213],4);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  id: 'mapbox.streets'
           }).addTo(map);
         axios.get(`https://nominatim.openstreetmap.org/?format=json&postalcode=${xx.value}&format=json&limit=1`).then((response) => {
             console.log(response.data);
                    if(response.data.length!=0)
                    {
                        var lat=response.data[0].lat;
                        var long=response.data[0].lon;
                     //   console.log(lat);
                        axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`)
                         .then((response) => {
                         var st =response.data.address.state;
                         st=st.toUpperCase();
                         axios.get('http://localhost:3000/api/'+st)
                         .then(response => {
                             response.data.forEach((x)=>{
                                 var block=x._id;
                                 var inuse=x.inuse;
                                 var total=x.total;
                                 console.log(block, inuse, total);
                             axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${st}&city=${block}&format=json&limit=1`,{
                                 inuse,
                                 total
                             })
                         .then((response) => {
                             if(response.data.length!==0)
                             {
                             //console.log(total);
                             //console.log(inuse);
                             //console.log(response.data[0]);
                             var lat=response.data[0].lat;
                             var long=response.data[0].lon;
                             console.log(lat);
                             var marker = L.marker([lat, long],{fillColor:'red'}).addTo(map);
                             marker.bindPopup("<b>SHALLOW TUBEWELLS</b><br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();
          
                             }
                         })
                         .catch(error => {
                             console.log(error);
                         });
          
                             })
                          
                     })
                     .catch(error=>{
                         console.log(error);
                     })
                     axios.get('http://localhost:3000/api/deep/'+st)
                         .then(response => {
                             response.data.forEach((x)=>{
                                 var block=x._id;
                                 var inuse=x.inuse;
                                 var total=x.total;
                                 console.log(block, inuse, total);
                             axios.get(`https://nominatim.openstreetmap.org/?format=json&country=india&state=${st}&city=${block}&format=json&limit=1`,{
                                 inuse,
                                 total
                             })
                         .then((response) => {
                             if(response.data.length!==0)
                             {
                             //console.log(total);
                             //console.log(inuse);
                             //console.log(response.data[0]);
                             var lat=response.data[0].lat;
                             var long=response.data[0].lon;
                             var circle = L.circle([lat,long], {
                             color: 'red',
                             fillColor: '#f03',
                             fillOpacity: 0.5,
                             radius: 20000
                             }).addTo(map);
                             circle.bindPopup("<b>DEEP TUBEWELLS</b><br><b>total "+total+"</b><br>"+"<b>inuse "+inuse+"</b><br>").openPopup();
                             }
          
                         })
                         .catch(error => {
                             console.log(error);
                         });
          
                             })
                          
                     })
                     .catch(error=>{
                         console.log(error);
                     })
   
                        }) .catch(error => {
                    console.log(error);
                });
                   }
                })
                .catch(error => {
                    console.log(error);
                });
    map1=map;
     }

