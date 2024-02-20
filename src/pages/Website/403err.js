import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../api/axios";
import { backenduser } from "../../api/api";

export default function Err403({ role }) {
  const [user, setuser] = useState("");

  useEffect(() => {
    Axios.get(`/${backenduser}`)
      .then((data) => setuser(data.data))
      .catch(() => (window.location.pathname = "/login"));
  }, []);
  return (
    <div
      className="container col-span-8"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>403 ACCESS DENIED</h1>
      <h2>YOU DONT HAVE PERMISSION TO ACCESS THIS PAGE.</h2>
      <Link
        to={role === "1996" ? "/dashboard/writer" : "/"}
        style={{
          textDecoration: "none",
          padding: " 10px",
          backgroundColor: "green",
          color: "white",
          borderRadius: "5px",
        }}
      >
        {role === "2001" ? "Go to home" : "Go to writer page"}
      </Link>
    </div>
  );
}
