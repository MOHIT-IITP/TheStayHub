import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({data}) =>{
      setPlaces(data);
    })
  },[])

  return (
    <div>
      <AccountNav />
        <div className="text-center">
          <Link className="bg-primary py-2 px-6 rounded-full inline-flex"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
        <div>
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} className=" cursor-pointer bg-gray-100 p-4 flex gap-4 rounded-lg mt-4" key={place._id}>
              <div className=" object-cover w-32 h-32 bg-gray-300 rounded-2xl shrink-0 ">
                {place.photos.length > 0 ? (
                  <img className="object-cover w-full  h-full rounded-2xl" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" onError={(e) => { console.error('Image failed to load:', e); }} />
                ) : (
                  <p>No photos available</p>
                )}
              </div>
              <div className="flex flex-col gap-2 grow-0 shrink">
              <h2 className="text-xl ">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}
