import {createContext, useEffect, useState} from "react";
import axios from "axios";
import { BackendUrl } from "./pages/PlaceFullPage";
export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get(BackendUrl + '/profile', {withCredentials: true}).then(({data}) => {
        setUser(data);
        setReady(true);
      });
    }else{
        console.log("User == null")
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser, ready}}>
      {children}
    </UserContext.Provider>
  );
}