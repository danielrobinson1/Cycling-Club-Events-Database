
/* These routes are working.*/

var express = require('express');
var router  = express.Router();

router

	// GET Render index view.

	.get('/', function(req, res) {
		res.render('index', { 
			title: 'Manchester Wheelers | Events' 
		});
	})

	// GET Render addevent view.

	.get('/addevent', function(req, res) {
		res.render('addevent', { 
			title: 'Manchester Wheelers | Add Event' 
		});
	})

	// GET Render editevent view

	.get('/editevent', function(req, res) {
		res.render('editevent', { 
			title: 'Manchester Wheelers | Edit Event' 
		});
	});


module.exports = router;