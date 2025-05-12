import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Place from "../models/place.js";
import BookingModel from "../models/booking.js";
dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

export function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtsecret, {}, async (err, userData) => {
      if (err) reject(err);
      resolve(userData);
    });
  });
}

export const handlePlaces = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
};


// if you want to end the details in your hotels
export const handlePlacesPut = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  console.log(req.body);
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
};

export const handleBooking = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const { place, checkIn, checkOut, nubmerOfGuests, name, phone, price } =
    req.body;
  BookingModel.create({
    place,
    checkIn,
    checkOut,
    nubmerOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};
export const handleBooking1 = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await BookingModel.find({ user: userData.id }).populate("place"));
};

export const GetPlaces = async (req, res) => {
  res.json(await Place.find());
};

export const GetPlacesId = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

export const handleUserPlace = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
};

export const handleBookingDelete = async (req, res) => {
    try {
        const {id: bookingId} = req.params;
        const booking = await BookingModel.findById(bookingId);
        if(!booking){
            return res.status(400).json({message: "Booking not found"});
        }
        await BookingModel.findByIdAndDelete(bookingId);
        res.json({message: "Booking deleted successfully"});
    } catch (error) {
        console.log("Error in handle booking delete controller", error);
        res.status(400).json({message:"Internal Server error" });
    }
}
