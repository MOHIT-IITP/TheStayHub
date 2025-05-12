import axios from "axios";
import { useContext, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BackendUrl } from "../pages/PlaceFullPage";

export default function BookingForm({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    );
  }

  async function bookThisPlace() {
    if (!user) {
      alert("Login First to Book This place");
      return;
    }
    if (
      !checkIn ||
      !checkOut ||
      !numberOfGuests ||
      !name.trim() ||
      !phone.trim()
    ) {
      alert("Please fill in all the fields before proceeding.");
      return;
    }
    const response = await axios.post(BackendUrl + "/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

    return (
        <div className="mt-4 bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price:₹{place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests: <span className="text-sm text-gray-500">
                        (Should be less than or equal to Max No. of guests)
                    </span>
                    </label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={(ev) => setNumberOfGuests(ev.target.value)}
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                        />
                        <label>Phone number:</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(ev) => setPhone(ev.target.value)}
                        />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4 text-white hover:shadow-xl">
                Book this place
                {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
            </button>
        </div>
    );
}
