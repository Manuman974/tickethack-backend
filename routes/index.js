var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')
const Cart = require('../models/carts')
const Booking = require('../models/bookings')

// route pour recuperer tous les trajets
router.get('/trips', (req, res) => {
  Trip.find().then(data => {
    res.json({ allTrips: data });
    console.log(data)
  });
});

// rechercher un trajet en fonction du départ, de l’arrivée et de la date
router.post('/trips', (req, res) => {
  const departure = req.body.departure;
  const arrival = req.body.arrival;
  const date = req.body.date;

  if (!departure || !arrival || !date) {
    return res.json({ result: false, error: "Les champs de départ et d'arrivée et dates sont obligatoires" });
  }
  const fromDate = new Date(date);
  const toDate = new Date(fromDate);
  toDate.setHours(23, 59, 59);

  Trip.find({
    departure: { $regex: new RegExp(departure, "i") },
    arrival: { $regex: new RegExp(arrival, "i") },
    date: {
      $gte: fromDate,
      $lte: toDate
    }
  })
  .then(data => {
    if (data.length > 0) {
      res.json({ result: true, trips: data });
    } else {
      res.json({ result: false, error: "Aucun trajet trouvé" });
    }
  })
});

// Route pour ajouter un trajet au panier
router.post('/carts', (req, res) => {
  const departure = req.body.departure;
  const arrival = req.body.arrival;
  const date = req.body.date;
  const price = req.body.price;
// Cart = modele
  const newCart = new Cart({
    departure: departure,
    arrival: arrival,
    data: date,
    price: price,
  })
  newCart.save().then(() => {
      res.json( { result: true })
  })
});

//route pour afficher tous les trajets ajoutés au panier
router.get('/carts', (req, res) => {
  Cart.find().then(data => {
    res.json({ allCartItem: data });
    console.log(data)
  });
});

//route pour supprimer le trajets du panier
router.delete('/carts', (req, res) => {
  Cart.deleteOne().then(data => {
    res.json({ result: true });
  })
});

//route pour affiche tous les trajets payés







module.exports = router;
