import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {motion} from "framer-motion"
import axios from "axios";
import Footer from "../components/Footer.jsx";
import { BackendUrl } from "./PlaceFullPage.jsx";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(BackendUrl + "/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className=" h-screen ">
      <div>
        <div className="flex justify-center items-center absolute top-2 ml-[43%] mr-[40%]">
          <motion.button
          whileHover={{backgroundColor: "#7F00FF", color:"white"}} className=" bg-violet-300 rounded-full text-black p-1 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </motion.button>
          <input
            className="!rounded-full"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Any Where"
            type="text"
          />
        </div>
      </div>
      <div className="p-10 rounded-[30px] bg-white mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
        {places.length > 0 &&
          places
            .filter((it) => {
              return search.toLowerCase() === ""
                ? it
                : it.address.toLowerCase().includes(search.toLowerCase());
            })
            .map((place, index) => (
              <Link key={index} to={"/place/" + place._id} className="bg-violet-100 shadow-lg overflow-hidden rounded-[30px]">
                <div className="bg-gray-500 flex overflow-hidden">
                  {place.photos?.[0] && (
                    <motion.div
                      transition={{ ease: "easeIn", duration: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        className="aspect-square object-cover"
                        src={place.photos[0]}
                        alt=""
                      />
                    </motion.div>
                  )}
                </div>
                <div className="px-8 py-3">
                  <h3 className="font-bold ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block mr-1"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path></svg>
                    {place.address}</h3>
                  <h2 className="text-gray-600">{place.title}</h2>
                  <div className="mt-2">
                    <span className="font-bold text-2xl mr-1">₹ {place.price} /- </span>
                    per night
                  </div>
                </div>
              </Link>
            ))}
      </div>
      <Footer />
    </div>
  );
}
