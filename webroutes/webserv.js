; //ROUTES
(function() {
  'use strict';

	var
	  express = require('express'),
	  router = express.Router(),
	  pwEncrypt = require('../server/SHA1.js'),
	  sql = require('mssql');

	router.get('/', function(req, res) {
		res.render('index', {
			title: 'TEE'
		});
	});


	router.post('/login', function(req, res) {
		/* 
		//Connect to SQL directly, No errors occur.
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
		*/ 


	 	/* 
	 	Used for connecting thru middleware, error: ECONN (Can't connect)
	 		// var conn = req.connection;
    Then use it to make sql Request
    	//var request = new sql.Request(conn);
    */

    var conn = req.connection;
    var info = req.body;   
    var request = new sql.Request(conn);
	
		searchUserName(info.user, info.pw);

    function searchUserName(findUser, findPw){
      var computeHash = pwEncrypt.hash(findPw);

      request.input('userName', findUser);
      request.input('passWord', computeHash); 
      request.output('userIdResult', sql.NVarchar);
      request.execute('[dbo].[getUserId]', authUserName);
      
      function authUserName(err){
        var dbUserId = request.parameters.userIdResult.value;
        if(!err){
          if (dbUserId !== null){
            res.json({
              status: 'proceed',
              content: dbUserId
            });
          } else {
            res.json({
              status: 'fail'
            });
          }
        }
      }
    }
	});

	router.post('/codesubmit', function(req, res) {

	});



	module.exports = router;

}());
