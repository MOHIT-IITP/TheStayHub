import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Perk from "../Perks";
export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
    onChange(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }
  // async function addPhotoByLink(e){
  //   e.preventDefault();
  //   const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
  //   setAddedPhotos(prev => {
  //     return[...prev, filename];
  //   });
  //   setPhotoLink('');
  // }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary py-2 px-6 rounded-full inline-flex"
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
      )}
      {action === "new" && (
        <div>
          <form action="">
            {preInput("Title", "Title of your place in short and simple way")}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title for example , My Apartment"
            />
            {preInput("Address", "Address to this place")}
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="address"
            />
            {preInput("Photos", "min 3 photos")}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                type="text"
                placeholder={"Add using a link ..."}
              />
              <button onClick={addPhotoByLink} className="rounded-2xl bg-gray-200 px-4">
                Add Photo
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div>
                  <img src={'http://localhost:4000/uploads' + link} alt="" />
                </div>
              ))}
              <button className="border bg-transparent rounded-2xl text-xl flex justify-center p-8">
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
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput("Description", " Description of Place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput("Perks", " Select all the perks of your place")}
            <div className="grid gap-2 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <Perk selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "House rules, No smoking, No alcohol  etc")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {preInput(
              " CheckIn & CheckOut times, max Guests",
              " add check in and out times, remember to have some time for cleaning for the room"
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in Time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="3:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1"> Check out Time</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                <input
                  type="Number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
