import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
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
          <Link className="bg-primary py-2 px-6 text-white hover:shadow-lg hover:animate-pulse rounded-full inline-flex"
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
        <div className="border-2 p-8 rounded-[30px] bg-neutral-200 mt-8">
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} className=" cursor-pointer shadow-lg bg-white p-6 flex gap-4 rounded-[30px] mt-8" key={place._id}>
              <div className=" object-cover w-32 h-32 bg-gray-300 rounded-2xl shrink-0 ">
                <PlaceImg place={place}/>
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
