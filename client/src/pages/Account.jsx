import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null)
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }


  async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return "Loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }


  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto ">
            Logged in as {user.name} ({user.email})
            <button onClick={logout} className="primary max-w-sm mt-2">LogOut</button>
        </div>
      )}
      {subpage==='places' && (
        <PlacesPage />
      )}
    </div>
  );
}
