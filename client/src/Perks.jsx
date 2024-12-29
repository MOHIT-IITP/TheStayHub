export default function Perk( {selected, onChange}) {
  return (
    <>
      <label className="border flex py-2 px-4 rounded-full gap-2 items-center">
        <input type="checkbox" />
        <span>Wifi</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox" />
        <span>Free Parking Spot</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox" />
        <span>Tv</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox" />
        <span>Pets</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox" />
        <span>Private entrace</span>
      </label>
    </>
  );
}
