
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var stations = require('./routes/stations.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//BEGIN API Routes

app.get('/api/stations', stations.get);


//END API Routes


//Allow for Cross Origin Resource Sharing (CORS).
//This allows our web app to access this API from another domain
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
