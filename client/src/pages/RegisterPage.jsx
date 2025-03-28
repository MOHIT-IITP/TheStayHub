import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BackendUrl = import.meta.env.VITE_BACKEND_URL

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post(BackendUrl + "/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful. Now you can Login");
    } catch (error) {
      alert("Registration Failed. Please try again later");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-center ">
      <div className="-mt-32 px-10 py-40 bg-neutral-100 shadow-xl rounded-3xl">
        <h1 className="text-7xl animate-pulse font-bold mb-20 text-center">Register</h1>
        <form action="" onSubmit={registerUser} className="max-w-md mx-auto">
          <div className="mt-4">

          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Mohit Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </div>
          <div className="mt-4">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="mt-4">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <button className="primary text-white hover:shadow-lg">Register</button>
          <div className="mt-4">
            Alrady have an account?{" "}
            <Link className="text-gray-600" to={"/Login"}>
              Login{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
