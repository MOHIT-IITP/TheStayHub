import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="bg-primary py-2 px-6 text-white hover:shadow-lg hover:animate-pulse rounded-full inline-flex"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="p-8 rounded-[30px]  mt-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className=" cursor-pointer shadow-lg bg-violet-100 p-6 flex gap-4 rounded-[30px] mt-8"
              key={place._id}
            >
              <div className="object-cover w-32 h-32 bg-gray-300 rounded-2xl shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="flex flex-col gap-2 grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
                <p className="text-xl flex items-center mt-6 gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path>
                  </svg>{" "}
                  <span className="font-bold">{place.price}</span>/- per night
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
