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

	.post('/', function(req, res) {
		
		var event = new Event(); 		// create a new instance of the Event model
		event.name = req.body.name;		// set the events name (comes from the request)

		// Save the event and check for errors
		event.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Event created!' });
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

	.get('/', function(req, res) {
		Event.find(function(err, events) {
			if (err)
				res.send(err);

			res.json(events);
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