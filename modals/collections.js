const mongo = require('mongoose');
var addSchema = mongo.Schema({
    pin: String,
    city: String,
    state: String,
    lat: Number,
    long: Number
})

var placeSchema = mongo.Schema({
    state: String,
    district: String,
    block: String
})
var shallowSchema = mongo.Schema({
    STATE: String,
    DISTRICT: String,
    BLOCK: String,
    INUSE: Number,
    TOTAL: Number
})
var deepSchema = mongo.Schema({
    STATE: String,
    DISTRICT: String,
    BLOCK: String,
    INUSE: Number,
    TOTAL: Number
})
var Irrigationschema=mongo.Schema({
    Block:String,
    Village:String,
    State:String,
    District:String,
    TotalCreated:Number,
    TotalUtilised:Number,
    Percentage:Number
})

var ShallowdepthcatSchema= new mongo.Schema({
    STATE: String,
    DISTRICT: String,
    BLOCK: String,
    FIRSTDEPTH: Number,
    FOURTHDEPTH: Number,
    SECONDDEPTH: Number,
    THIRDDEPTH: Number,
    FIFTHDEPTH: Number,
    TOTAL: Number
})
var DeepdepthcatSchema= new mongo.Schema({
    STATE: String,
    DISTRICT: String,
    BLOCK: String,
    FIRSTDEPTH: Number,
    SECONDDEPTH: Number,
    THIRDDEPTH: Number,
    FOURTHDEPTH: Number,
    FIFTHDEPTH: Number,
    TOTAL: Number
})
var DepthlevelSchema= new mongo.Schema({
    FIELD1: Number,
    STATE: String,
    DISTRICT: String,
    BLOCK: String,
    totalwell4: Number,
    avg4: Number,
    avg5: Number,
    totalwell5: Number,
})
var WaterlevelSchema= new mongo.Schema({
    STATE: String,
    DISTRICT: String,
    BLOCK: Number,
    Lat: Number,
    Long: Number,
    Year: Number,
    Level: Number,
})
var DugwellSchema= new mongo.Schema({
    STATE: String,
    DISTRICT: String,
    BLOCK: String,
    TOTAL4: Number,
    AVG4: Number,
    TOTAL5: Number,
    AVG5: Number,
})
module.exports.Dugwellprediction = mongo.model( 'Dugwellprediction', DugwellSchema );
module.exports.Depthlevelprediction = mongo.model( 'Depthlevelprediction', DepthlevelSchema );
module.exports.Waterlevelprediction = mongo.model( 'Waterlevelprediction', WaterlevelSchema );
module.exports.Place = mongo.model( 'Place', placeSchema );
module.exports.Address = mongo.model('Address', addSchema);
module.exports.Shallowmitwo = mongo.model( 'Shallowmitwo',shallowSchema);
module.exports.Shallowmione = mongo.model( 'Shallowmione',shallowSchema);
module.exports.Deepmitwo = mongo.model( 'Deepmitwo',deepSchema);
module.exports.Deepmione = mongo.model( 'Deepmione',deepSchema);
module.exports.Irrigationshallowe = mongo.model('Irrigationshallowe', Irrigationschema);
module.exports.Irrigationdeep = mongo.model('Irrigationdeep', Irrigationschema);
module.exports.Shallowdepthcat=mongo.model('Shallowdepthcat',ShallowdepthcatSchema)
module.exports.Deepdepthcat=mongo.model('Deepdepthcat',DeepdepthcatSchema);