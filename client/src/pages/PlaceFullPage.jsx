import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/BookingForm.jsx";
import PlaceGallery from "../components/PlaceGallery.jsx";
import LocationMap from "../components/LocationMap.jsx";

export default function PlaceFullPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) {
    return "";
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8 relative">
      <h1 className="text-3xl font-extrabold">{place.title}</h1>
      <LocationMap place={place} />
      <PlaceGallery place={place} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div className=" mb-8 p-8 rounded-3xl shadow-sm bg-white mt-4">
          <div className="my-4 ">
            <h2 className="font-semibold text-3xl">Description: </h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-Out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingForm place={place} />
        </div>
      </div>
      <div className="bg-white mt-4 -mx-8 px-8 py-8 ">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mt-3 mb-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
