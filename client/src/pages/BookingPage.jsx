import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LocationMap from "../components/LocationMap.jsx";
import PlaceGallery from "../components/PlaceGallery.jsx";
import BookingDates from "../components/BookingDate.jsx";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{booking.place.title} </h1>
      <LocationMap className="my-2 block" place={booking.place} />
      <div className="flex items-center justify-between pr-8 bg-gray-200 p-4 mb-4 rounded-xl">
        <div>
          Your booking infromation:
          <BookingDates booking={booking} className="mt-3" />
        </div>
        <div>
          <p>Total price </p>
          <h2 className="font-bold text-3xl">₹{booking.price}</h2>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
