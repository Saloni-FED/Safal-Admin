// pages/login.js
"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "./Login.css";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in sucessfully");
      router.push("/entry")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
}
