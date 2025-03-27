const express = require("express");
const { handlePlaces, handlePlacesPut, handleBooking, handleBooking1, GetPlaces, GetPlacesId, handleUserPlace } = require("../controllers/places.controller");
const router = express.Router();

router.post("/places", handlePlaces);
router.put('/places',handlePlacesPut);
router.post('/bookings',handleBooking);
router.get("/bookings", handleBooking1);
router.get("/places", GetPlaces);
router.get("/places/:id", GetPlacesId);
router.get("/user-places", handleUserPlace);

module.exports = router;