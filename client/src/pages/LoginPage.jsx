import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect , setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLogin(e){
    e.preventDefault();
    try {
        const {data} = await axios.post('/login', {email, password});
        setUser(data);
        alert("Login Successfull")
        setRedirect(true);
    } catch (error) {
        alert("Login Failed")
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center  justify-center">
      <div className="-mt-32  px-10 py-40 bg-neutral-100 rounded-3xl">
        <h1 className="text-7xl mb-20 animate-pulse font-bold text-center">Login</h1>
        <form action="" className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="mt-4">
            Don't have an account?{" "}
            <Link className="text-gray-600" to={"/register"}>
              {" "}
              Register now{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
