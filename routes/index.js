var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')

/* GET home page. */
router.get('/trips', (req, res) => {
  Trip.find().then(data => {
    res.json({ allTrips: data });
  });
})

module.exports = router;
