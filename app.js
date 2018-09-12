let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

// Setup Environment
require('dotenv').config();

//NOTE: why not isDevelopment?
let isProduction = process.env.NODE_ENV === 'production';

// Global app object
let app = express();

// Normal express config defaults
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Config Dev Env
if(!isProduction){
  app.use(errorhandler());
  mongoose.set('debug', true);
}
mongoose.connect(process.env.DB_URL);

// Model imports
require('./models');

// Setup Routing
const routes = require('./routes');
app.use('/', routes);

// Catch 404 Errors and return response
app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function(err, req, res, next){
  // Print stack trace if not in produnction
  var returnError = {}
  if(!isProduction) {
    console.log(err.stack);
    returnError = err
  }

  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: returnError
    }
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, function(){
  console.log(`BookLib [Info]: Started Server on port ${PORT}`);
})
