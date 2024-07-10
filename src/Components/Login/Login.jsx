// pages/login.js
"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "./Login.css";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import newLogo from "../../../src/assests/newLogo.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import { toast } from "react-hot-toast"

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/entry");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully");
      router.push("/entry");
    } catch (error) {
      console.log(error.code)
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("Invalid email address.");
            break;
          case "auth/user-disabled":
            toast.error("User account is disabled.");
            break;
          case "auth/user-not-found":
            toast.error("User not found.");
            break;
          case "auth/invalid-credential":
            toast.error("Invalid Credential. Please Check Your Email and password !.");
            break;
          case "auth/wrong-password":
            toast.error("Invalid password.");
            break;
          default:
            toast.error("An error occurred. Please try again.");
            break;
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={newLogo}
            width={100}
            height={100}
            alt="safal"
            style={{ margin: "1.5rem auto", width: "20rem" }}
          />
        </div>

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
