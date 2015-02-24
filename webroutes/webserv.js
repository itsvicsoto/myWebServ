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

    var conn = req.connection;
    var info = req.body;   
    var request = new sql.Request(conn);
	
		searchUserName(info.user, info.pw);

    function searchUserName(findUser, findPw){
      var computeHash = pwEncrypt.hash(findPw);

      request.input('userName', findUser);
      request.input('passWord', computeHash); 
      request.execute('[dbo].[getUserId]', authUserName);
      
      function authUserName(err, record){
        if(!err){
          res.json({
              content: record[0]
            });
          } else {
            res.json({
              status: 'fail'
            });
          }
        }
      }
	});

	router.post('/submit', function(req, res) {
	 	var conn = req.connection;
    var info = req.body;   
    var request = new sql.Request(conn);

    searchProductionCode(info.code);

    function searchProductionCode(pCode){
    	request.input('productCode', pCode);
    	request.execute('[dbo].[getProductSheet]', doSpProductSheet);

    	function doSpProductSheet(err, record){
    		if(!err){
          res.json({
            content: record[0]
          });
    		}
    	}
    }
	});



	module.exports = router;
}());
