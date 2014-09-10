/* Testing new routes */

var express = require('express');
var router  = express.Router();

// Import Event model

var Event   = require('../models/event');

router

// GET Returns all events in json for purposes of testing in Postman CLient.
// Working

.get('/test/list', function(req, res) {
		Event.find(function(err, events) {
			if (err)
				res.send(err);

			res.json(events);
		});
	})

// DELETE Remove event with the specified id.
// Working

	.delete('/test/delete/:event_id', function(req, res) {
		Event.remove({
			_id: req.params.event_id
		}, function(err, event) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});



module.exports = router;