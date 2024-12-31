import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer.jsx";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <>
      <div className=" mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-500 flex rounded-2xl ">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <div>
                <h3 className="font-bold">{place.address}</h3>
                <h2 className="text-gray-600">{place.title}</h2>
                <div className="mt-2">
                  <span className="font-bold mr-1">₹{place.price}</span>
                  per night
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}
