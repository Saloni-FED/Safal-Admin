// import Image from "next/image";
// import styles from "./page.module.css";
import Login from "@/Components/Login/Login";
import { Toaster } from "react-hot-toast";
export default function Home() {
  return <main className=""><Login/>
  <Toaster/>
  </main>;
}
