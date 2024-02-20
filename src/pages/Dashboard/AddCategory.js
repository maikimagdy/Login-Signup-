import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../api/axios";
import { cat } from "../../api/api";
import { MenuContext } from "../../components/context/menuContext";

export default function AddCategory() {
  const [title, settitle] = useState("");
  const [img, setimg] = useState("");
  const menu = useContext(MenuContext);
  const open = menu.menu;
  // focus on certain field
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  // focus on certain field

  // submit function and send data after adding Category
  async function sub(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", img);
    try {
      const res = await Axios.post(`${cat}/add`, form);
      console.log(res);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      console.log(err);
    }
  }
  // submit function and send data after adding Category

  return (
    <div
      className={` mr-3 bg-slate-100 p-3 ${
        open ? "col-span-8" : "col-span-11"
      }`}
    >
      <form className="form-edit" onSubmit={sub}>
        <label htmlFor="1">Title</label>
        <input
          ref={focus}
          className="inp"
          name="title"
          placeholder="Title"
          id="1"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          type="text"
          required
        ></input>
        <label htmlFor="2">Img</label>
        <input
          type="file"
          id="2"
          onChange={(e) => setimg(e.target.files[0])}
        ></input>
        <button
          style={{
            width: "100px",
            border: "none",
            backgroundColor: "#1096E1",
            padding: "10px",
            borderRadius: "6px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
