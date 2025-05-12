import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LocationMap from "../components/LocationMap.jsx";
import PlaceGallery from "../components/PlaceGallery.jsx";
import BookingDates from "../components/BookingDate.jsx";

import { BackendUrl } from "./PlaceFullPage.jsx";
import { UserContext } from "../UserContext.jsx";

export default function BookingPage() {
    const {user} = useContext(UserContext);
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    const navigate = useNavigate();

    const DeleteBooking = async () => {
        if (user) {
            try {
                await axios.post(`${BackendUrl}/bookings/${id}`);
                navigate('/account/bookings');
            } catch (error) {
                alert("Failed to delete booking.");
            }
        } else {
            alert("You are not authorised for this action");
        }
    }

  useEffect(() => {
    if (id) {
      axios.get(BackendUrl + "/bookings").then((response) => {
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
            <h1 className="mt-20 text-3xl font-bold">{booking.place.title} </h1>
            <LocationMap className="my-2  block" place={booking.place} />
            <div className="flex items-center justify-between pr-8 bg-gray-200 p-4 mb-4 rounded-xl">
                <div>
                    Your booking infromation:
                    <BookingDates booking={booking} className="mt-3" />
                    <h2 className="mt-4 font-bold text-2xl">{booking.name}</h2>
                </div>
                <div>
                    <p>Total price </p>
                    <h2 className="font-bold text-3xl">₹{booking.price}</h2>
                </div>
                <button onClick={DeleteBooking} className="flex flex-cols justify-center items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-8 hover:text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                    </div>
                </button>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}
