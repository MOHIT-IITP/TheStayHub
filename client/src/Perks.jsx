export default function Perk( {selected, onChange}) {
  function handleCheckBoxClick(ev){
    const {checked, name} = ev.target;
    if (checked)  { 
      onChange([...selected, name]);
    }else{
      onChange(selected.filter(selelctedName => selelctedName !== name));
    }
    // onchange([...selected, name]);
  }
  return (
    <>
      <label className="border flex py-2 px-4 rounded-full gap-2 items-center">
        <input type="checkbox" name="wifi" onChange={handleCheckBoxClick} />
        <span>Wifi</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox"  name="parking" onChange={handleCheckBoxClick}/>
        <span>Free Parking Spot</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox" name="Tv" onChange={handleCheckBoxClick} />
        <span>Tv</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox" name="pets" onChange={handleCheckBoxClick} />
        <span>Pets</span>
      </label>
      <label className="border flex p-4 rounded-full gap-2 items-center">
        <input type="checkbox"  name="entrance" onChange={handleCheckBoxClick} />
        <span>Private entrace</span>
      </label>
    </>
  );
}
