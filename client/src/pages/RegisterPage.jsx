import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
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
      <div className="-mt-32 px-10 py-40 bg-neutral-100 rounded-3xl">
        <h1 className="text-7xl animate-pulse font-bold mb-20 text-center">Register</h1>
        <form action="" onSubmit={registerUser} className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Mohit Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary text-black">Register</button>
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
