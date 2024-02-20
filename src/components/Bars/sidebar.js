import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../context/menuContext";
import { Axios } from "../../api/axios";
import { backenduser } from "../../api/api";
export default function Sidebar() {
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const [user, setuser] = useState("");
  console.log(user);
  useEffect(() => {
    Axios.get(`${backenduser}`).then((data) => setuser(data.data));
  }, []);

  return (
    <div
      className={` row-span-11 py-10 bg-white shadow-inner  h-100  transition-all duration-200 ${
        open ? "col-span-4" : "col-span-1"
      } `}
    >
      {user.role === "1995" ? (
        <>
          <NavLink to={"users"} className={"side-link"}>
            <i
              className="fa-solid fa-users-line"
              style={{ marginTop: "5px" }}
            ></i>
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Users
            </p>
          </NavLink>
          <NavLink to={"user/add"} className={"side-link"}>
            {
              <i
                className="fa-solid fa-user-plus"
                style={{ marginRight: "3px" }}
              ></i>
            }
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Add User
            </p>
          </NavLink>
          <>
            {" "}
            <NavLink to={"categories"} className={"side-link"}>
              {
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{ marginRight: "3px" }}
                ></i>
              }
              <p
                style={{
                  display: open ? "inline-block" : "none",
                  margin: 0,
                  fontSize: open ? "23px" : "25px ",
                }}
              >
                Categories
              </p>
            </NavLink>
            <NavLink to={"category/add"} className={"side-link"}>
              {
                <i
                  className="fa-solid fa-cart-plus"
                  style={{ marginRight: "3px" }}
                ></i>
              }
              <p
                style={{
                  display: open ? "inline-block" : "none",
                  margin: 0,
                  fontSize: open ? "23px" : "25px ",
                }}
              >
                Add Category
              </p>
            </NavLink>
            <NavLink to={"products"} className={"side-link"}>
              {
                <i
                  className="fa-solid fa-box-open"
                  style={{ marginRight: "3px" }}
                ></i>
              }
              <p
                style={{
                  display: open ? "inline-block" : "none",
                  margin: 0,
                  fontSize: open ? "23px" : "25px ",
                }}
              >
                Products{" "}
              </p>
            </NavLink>
            <NavLink to={"product/add"} className={"side-link"}>
              {
                <i
                  className="fa-solid fa-plus"
                  style={{ marginRight: "3px" }}
                ></i>
              }
              <p
                style={{
                  display: open ? "inline-block" : "none",
                  margin: 0,
                  fontSize: open ? "23px" : "25px ",
                }}
              >
                Add product
              </p>
            </NavLink>
          </>
          <NavLink to={"writer"} className={"side-link"}>
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Writer
            </p>
          </NavLink>
        </>
      ) : user.role === "1999" ? (
        <>
          {" "}
          <NavLink to={"categories"} className={"side-link"}>
            {
              <i
                className="fa-solid fa-cart-shopping"
                style={{ marginRight: "3px" }}
              ></i>
            }
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Categories
            </p>
          </NavLink>
          <NavLink to={"category/add"} className={"side-link"}>
            {
              <i
                className="fa-solid fa-cart-plus"
                style={{ marginRight: "3px" }}
              ></i>
            }
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Add Category
            </p>
          </NavLink>
          <NavLink to={"products"} className={"side-link"}>
            {
              <i
                className="fa-solid fa-box-open"
                style={{ marginRight: "3px" }}
              ></i>
            }
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Products{" "}
            </p>
          </NavLink>
          <NavLink to={"product/add"} className={"side-link"}>
            {
              <i
                className="fa-solid fa-cart-plus"
                style={{ marginRight: "3px" }}
              ></i>
            }
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Add Category
            </p>
          </NavLink>
        </>
      ) : (
        user.role === "1996" && (
          <NavLink to={"writer"} className={"side-link"}>
            <p
              style={{
                display: open ? "inline-block" : "none",
                margin: 0,
                fontSize: open ? "23px" : "25px ",
              }}
            >
              Writer
            </p>
          </NavLink>
        )
      )}
    </div>
  );
}
