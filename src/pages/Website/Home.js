import { Link } from "react-router-dom";
import Training from "../../Udacity/Training";
import logo from "../../logo.svg";
import { useState } from "react";
import Mathgame from "../../Udacity/Mathgame";
import Component from "../../Udacity/controlledcomponents";
export default function Home() {
  const [newarr, setnewarr] = useState([
    {
      id: "karen",
      name: "Karen Isgrigg",
      handle: "karen_isgrigg",
      avatarURL: `${logo}`,
    },
    {
      id: "richard",
      name: "Richard Kalehoff",
      handle: "richardkalehoff",
      avatarURL: `${logo}`,
    },
    {
      id: "tyler",
      name: "Tyler McGinnis",
      handle: "tylermcginnis",
      avatarURL: `${logo}`,
    },
  ]);

  function Del(id) {
    setnewarr((prev) =>
      prev.filter((e) => {
        return e.id !== id;
      })
    );
  }
  // const movie = [
  //   {
  //     id: "movie one ",
  //     fav: true,
  //     name: "Karen Isgrigg",
  //   },
  //   {
  //     id: "movie one ",

  //     fav: false,
  //     name: "Richard Kalehoff",
  //   },
  //   {
  //     id: "movie one ",

  //     fav: true,
  //     name: "Tyler McGinnis",
  //   },
  // ];

  return (
    <div>
      <Link
        to={"/login"}
        style={{
          width: "80px",
          backgroundColor: "red",
          padding: "20px",
          margin: "10px",
          borderRadius: "5px",
          color: "white",
        }}
      >
        Login{" "}
      </Link>
      <Link
        style={{
          width: "80px",
          backgroundColor: "red",
          padding: "20px",
          margin: "10px",
          borderRadius: "5px",
          color: "white",
        }}
        to={"/register"}
      >
        Sign up
      </Link>
      <div className="mt-80">
        {/* <Training contacts={newarr} handledel={Del} /> */}
      </div>
      <div>{/* <Mathgame /> */}</div>
      <div>
        <Component />
      </div>
    </div>
  );
}
