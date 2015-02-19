; // Setup server
(function() {
  'use strict'; 

  var express = require('express');
  var app = express();
  var logger = require('morgan');
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  var sql = require('mssql');
  var routes = require('./webroutes/webserv');

  /* 
    Nung ginawa ko 'to instead of express.static(etc).. gumana yung core.js
    var routes = require('./webroutes/webserv');
    app.use('/', routes);
  */

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(cookieParser());
  app.use(express.static(__dirname + '/node_modules'));
  app.use(express.static(__dirname + '/webcli'));
  

  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

  /* This config won't work if used in webserv.js */
  //Connect SQL Database
  app.use(function(req, res, next) {

    var config = {
      user: 'TeeDevMobile',
      password: 'tdm',
      server: 'localhost\\SQLEXPRESS',
      database: 'Tee.Db'
    }

    var connection = new sql.Connection(config, function(err) {
      if (err) {
        console.log(err);
      }
    });

    req.connection = connection;
    next();
  });

  app.get('/404', function(req, res){
    res.send('hello world');
  });


  app.use('/', routes);
  
  // Express Server Config
  app.set('port', process.env.PORT || 3000);

  /* 
    Paturo anong ginagawa nito. Pati yung config.js
  // Default Application Directories that are served.
  app.use('/app', express.static(__dirname + config.root + '/app'));
  app.use('/assets', express.static(__dirname + config.root + '/assets'));
  */

  // Redirect all requests to the application root's index.html
  // so AngularJS could handle routes unless specified in this file
  app.get('*', function (req, res) {
    res.sendFile(__dirname + '/webcli/ndex.html');
  });

   // Express Server Config
  app.set('port', process.env.PORT || 3000);

  // Listener
  app.listen(app.get('port'), function() {
    console.log('> Running in Localhost:' + app.get('port'))
  });

  module.exports = app;
}());