export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "nothing";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className="object-cover w-full  h-full rounded-2xl"
      src={`http://localhost:4000/uploads/${place.photos[0]}`}
      alt=""
      onError={(e) => {
        console.error("Image failed to load:", e);
      }}
    />
  );
}
