import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {motion} from "framer-motion"
import axios from "axios";
import Footer from "../components/Footer.jsx";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/places").then((response) => {
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
              className="size-6"
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
      <div className="p-10 rounded-[30px] bg-neutral-200 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
        {places.length > 0 &&
          places
            .filter((it) => {
              return search.toLowerCase() === ""
                ? it
                : it.address.toLowerCase().includes(search.toLowerCase());
            })
            .map((place) => (
              <Link to={"/place/" + place._id} className="bg-white shadow-lg rounded-[30px] p-10">
                <div className="bg-gray-500 flex rounded-[20px] overflow-hidden">
                  {place.photos?.[0] && (
                    <motion.div
                      transition={{ ease: "easeIn", duration: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        className="rounded-[20px] aspect-square object-cover"
                        src={place.photos[0]}
                        alt=""
                      />
                    </motion.div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold mt-8">{place.address}</h3>
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
