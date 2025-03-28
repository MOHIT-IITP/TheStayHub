import {motion} from "framer-motion"
export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "nothing";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <motion.div whileHover={{scale:1.2}}>
    <img
      className="object-cover aspect-square  w-full  h-full rounded-2xl"
      src={place.photos[0]}
      alt=""
      onError={(e) => {
        console.error("Image failed to load:", e);
      }}
    />
    </motion.div>
  );
}
