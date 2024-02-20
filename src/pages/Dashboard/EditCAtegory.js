import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../api/axios";
import { cat } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { MenuContext } from "../../components/context/menuContext";

export default function Editcat() {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const focus = useRef(null);
  let count = useRef(0);
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const navigation = useNavigate();
  const { id } = useParams();
  // to get Category details accord to user id

  useEffect(() => {
    Axios.get(`${cat}/${id}`)
      .then((data) => {
        settitle(data.data.title);
        count.current = count.current + 1;
        focus.current.focus();
      })
      .catch(() => navigation("/Err404", { replace: true }));
  }, []);
  // to get Category details accord to user id

  // submit function and send data after editing userdetails
  async function sub(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${cat}/edit/${id}`, form);
      console.log(res);
      navigation("/dashboard/categories");
    } catch (err) {
      console.log(err);
    }
  }
  // submit function and send data after editing userdetails

  return (
    <div
      className={`h-100  bg-slate-100 p-3 ${
        open ? "col-span-8" : "col-span-11"
      }`}
    >
      <form className="form-edit" onSubmit={sub}>
        <label htmlFor="1">title</label>
        <input
          className="inp"
          name="title"
          placeholder="Title"
          id="1"
          ref={focus}
          value={title}
          onChange={(e) => settitle(e.target.value)}
          type="text"
        ></input>
        <p>counter{count.current} </p>
        <label htmlFor="2">image</label>
        <input
          type="file"
          id="2"
          onChange={(e) => setimage(e.target.files[0])}
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
