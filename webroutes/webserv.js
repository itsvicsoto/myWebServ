; //ROUTES
(function() {
  'use strict';

	var
	  express = require('express'),
	  router = express.Router(),
	  sql = require('mssql');

	router.get('/', function(req, res) {
		res.render('index', {
			title: 'TEE'
		});
	});

	router.get('/login', function(req, res) {
		res.send('success');
	// res.header('Content-Type: application/json');

	// var tempDB = '';
	// var connection = req.connection;

	// var request = new sql.Request(connection);

	// request.input()
	// request.execute('[dbo].[myProd]', function(err, recordsets, returnValue) {
	//   if(err){
	//     console.log(err);
	//   }
	//   res.send(recordsets);
	// });
	});

	module.exports = router;

}());
