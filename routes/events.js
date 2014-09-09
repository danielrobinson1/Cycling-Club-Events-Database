/* 

These route need work.

They were copied from the wheelers_events_app project which
used a local database with mong and monk.

The routes need modifying to work with mongoose and our Event model.

*/

var express = require('express');
var router  = express.Router();

// Import our Event model.

var Event   = require('../models/event');


router

	/*

	POST Add an event to the database

	New request works with mongoose.

	TODO Remove json message and setup to get
	values from the form as in the old POST request
	below.

	*/

	// Changes

	// Changed URL to from / to /addevent to match the form "action".
	// May need to change the form action to "events/addevent".

	// TODO Redirect to eventslist page.

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

			// Redirect to home page for now.

			//res.location("eventlist");
			res.redirect("../");
		});
		
	})

	
		/*

		Old request worked with mongo and monk.

		TODO Delete once functionality has been transferred
		to new request.

		*/

		/*

		.post('/addevent', function(req, res) {

			// Set our internal DB variable
			var db = req.db;

			// Get our form values, using 'name' attributes
			var eventDate = req.body.date;
			var eventName = req.body.name;
			var eventType = req.body.type;

			// Set our collection
			var collection = db.get('eventcollection');

			// Submit to the DB
			collection.insert({
				"date" : eventDate,
				"name" : eventName,
				"type" : eventType
			}, function(err, doc) {
				if (err) {
					// If it failed, return error
					res.send("There was a problem adding the event to the database.")
				}
				else {
					// If it worked, set the header so the adress bar doesn't still say /addevent.
					res.location("eventlist");
					// And forward to success page
					res.redirect("eventlist");
				}
			});
		});

		*/


	/*

	GET request to get all events in the db

	New GET request.

	TODO Remove jso message and return events in the table
	in the eventlist view

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

		/*

		Old GET request. Works woith mongo and monk.

		TODO Delete once functionality has been 
		transferred to new request.

		*/

		/*

		.get('/eventlist', function(req, res) {
			var db = req.db;
			var collection = db.get('eventcollection');
			collection.find({},{},function(e,docs){
				res.render('eventlist', {
					"eventlist" : docs, title: 'Manchester Wheelers | Event List'
				});
			});
		});

		*/

module.exports = router;