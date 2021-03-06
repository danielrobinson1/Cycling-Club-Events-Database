var express = require('express');
var router  = express.Router();

// Import our Event model.

var Event   = require('../models/event');


router

	// GET Render home page.

	.get('/', function(req, res) {
		res.render('index', { 
			title: 'Manchester Wheelers | Events' 
		});
	})

	// GET Render editevent view.

	.get('/editevent', function(req, res) {
		res.render('editevent', { 
			title: 'Manchester Wheelers | Edit Event' 
		});
	})

	// GET Render addevent view.

	.get('/addevent', function(req, res) {
		res.render('addevent', { 
			title: 'Manchester Wheelers | Add Event' 
		});
	})

	/*

	POST Add an event to the database.

	TODO Redirect to eventslist page.

	*/

	.post('/addevent', function(req, res) {
		
		// Create a new instance of the Event model.

		var event = new Event();
		
		// Set the events details from the form in the addevent view.

		event.name = req.body.name;
		event.date = req.body.date;
		event.type = req.body.type;

		// Save the event and check for errors

		event.save(function(err) {
			if (err)
				res.send(err);

			// Command prompt message to confirm event saved.

			console.log(event.name + ' saved.');

			// Redirect to events list.

			res.location("events");
			res.redirect("list");
		});
		
	})


	/*

	GET Retrieve all events in the database 

	and render the eventlist view.

	*/

	.get('/list', function(req, res) {
		Event.find(function(err, events) {
			if (err)
				res.send(err);

			res.render('eventlist', {
            	"eventlist" : events, title: 'Manchester Wheelers | Event List'
        	});
		});
	});

module.exports = router;