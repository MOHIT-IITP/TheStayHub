import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/BookingForm";

export default function PlaceFullPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
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

  if (showAllPhotos) {
    return (
      <div className="fixed bg-black  text-white inset-0 overflow-auto min-h-full ">
        <div className="p-8 bg-black grid gap-4">
          <div>
            <h2 className="text-3xl mr-48 font-extrabold">{place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=" right-8 top-6 shadow-grey-500 flex gap-1 py-2 px-4 rounded-2xl bg-white text-black fixed "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clipRule="evenodd"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8 relative">
      <h1 className="text-3xl font-extrabold">{place.title}</h1>
      <a
        className=" flex block my-2 font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
            <div>
              {place.photos?.[2] && (
                <img onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover relative top-2 cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className=" absolute flex gap-2 shadow-gray-400 bottom-4 right-8 py-2 px-4 rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
          Show all photos
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div className=" mb-8 mt-4">
      <div className="my-4 ">
        <h2 className="font-semibold text-2xl">Description: </h2>
        {place.description}
      </div>
          Check-in: {place.checkIn} <br />
          Check-Out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingForm  place={place}/>
        </div>
      </div>
      <div className="bg-white mt-4 -mx-8 px-8 py-8 ">
      <div>
        <h2 className="font-semibold text-2xl">Extra Info</h2>
      </div>
      <div className="text-sm text-gray-700 leading-5 mt-3 mb-4">{place.extraInfo}</div>
      </div>
    </div>
  );
}
