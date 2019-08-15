var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongoose');
var cors = require('cors');
var bp = require('body-parser');
var fileUpload = require('express-fileupload');

mongo.connect('mongodb://admin:sih2admin@ds349065.mlab.com:49065/sih',{ useNewUrlParser: true }, ()=>{
    console.log("Connected to db");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api');
var adminRouter = require('./routes/admin');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.urlencoded({extended:false}));
app.use(bp.json())
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/admin', adminRouter);

app.use(express.static(__dirname+'/views'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

  
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

var port = process.env.PORT || '3000';

app.listen(port, ()=>{
  console.log("Listening to Port ", port )
});