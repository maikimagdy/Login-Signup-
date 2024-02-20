import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../context/menuContext";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "../../pages/Website/Logout";
import Register from "../../pages/Website/Register";
import { Axios } from "../../api/axios";
import { backendlogout, backenduser } from "../../api/api";
import Cookie from "cookie-universal";
export default function Topbar() {
  const menu = useContext(MenuContext);
  const [user, setuser] = useState("");
  const open = menu.menu;
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookie();
  async function logout() {
    try {
      await Axios.get(`/${backendlogout}`);
      cookie.removeAll(); // Clear cookies
      window.location.pathname = "/login"; // Redirect to the login page
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    Axios.get(`/${backenduser}`)
      .then((data) => setuser(data.data))
      .catch(() => navigate("/login"));
  }, []);
  function display() {
    setshow((prev) => !prev);
  }

  return (
    <div className="col-span-12 flex justify-between m-2 ">
      <div className="topmenu ml-8 duration-100">
        <h1
          style={{
            margin: "0",
            display: open ? "block" : "none",
          }}
        >
          {" "}
          Topbar
        </h1>
        <i
          className="fa-solid fa-bars"
          style={{ cursor: "pointer" }}
          onClick={() => menu.setmenu((prev) => !prev)}
        ></i>{" "}
      </div>

      <div>
        <>
          <p
            onClick={display}
            className="drop-btn"
            style={{
              position: "static",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {user.name}
            <span
              style={{
                border: "6px solid",
                marginTop: "7px",
                borderColor: "white transparent transparent transparent",
              }}
            ></span>
          </p>
        </>
        {show && (
          <p
            style={{
              margin: 0,
              background: "#D9D9D9",
              width: "150px",
              padding: "10px 5px",
              position: "fixed",
              borderRadius: "10px",
              right: "64px",
              top: "45px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={logout}
          >
            Logout
          </p>
        )}
      </div>
    </div>
  );
}
