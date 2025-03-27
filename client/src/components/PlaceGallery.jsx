import { useState } from "react";
export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="top-0 z-999 fixed bg-black text-white inset-0 overflow-auto min-h-full ">
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
          <div key={photo}>
          <img src={photo} alt="" />
          </div>
        ))}
      </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 h-[80vh] rounded-2xl overflow-hidden">
        <div className="col-span-2">
          {place.photos?.[0] && (
            <div key={place.photos[0]} className="h-full">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover h-full w-full"
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {place.photos?.[1] && (
            <div key={place.photos[1]} className="h-1/2">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover h-full w-full"
                src={place.photos[1]}
                alt=""
              />
            </div>
          )}
          {place.photos?.[2] && (
            <div key={place.photos[2]} className="h-1/2">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover h-full w-full"
                src={place.photos[2]}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute flex gap-2 shadow-gray-400 bottom-4 right-8 py-2 px-4 rounded-2xl"
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
  );
}
