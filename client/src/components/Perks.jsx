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
      <label className="border flex py-2 px-4 rounded-2xl gap-2 items-center">
        <input type="checkbox"  checked={selected.includes('wifi')} name="wifi" onChange={handleCheckBoxClick} />
        <span>Wifi</span>
      </label>
      <label className="border flex p-4 rounded-2xl gap-2 items-center">
        <input type="checkbox"  checked={selected.includes('parking')}  name="parking" onChange={handleCheckBoxClick}/>
        <span>Free Parking Spot</span>
      </label>
      <label className="border flex p-4 rounded-2xl gap-2 items-center">
        <input type="checkbox"  checked={selected.includes('Tv')} name="Tv" onChange={handleCheckBoxClick} />
        <span>Tv</span>
      </label>
      <label className="border flex p-4 rounded-2xl gap-2 items-center">
        <input type="checkbox"  checked={selected.includes('pets')} name="pets" onChange={handleCheckBoxClick} />
        <span>Pets</span>
      </label>
      <label className="border flex p-4 rounded-2xl gap-2 items-center">
        <input type="checkbox"  checked={selected.includes('entrance')}  name="entrance" onChange={handleCheckBoxClick} />
        <span>Private entrace</span>
      </label>
    </>
  );
}
