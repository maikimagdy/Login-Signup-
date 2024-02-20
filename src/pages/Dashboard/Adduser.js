import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../api/axios";
import { backenduser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../components/context/menuContext";

export default function Adduser() {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [err, seterr] = useState("");
  const [ok, setok] = useState(false);
  const navigation = useNavigate();
  const menu = useContext(MenuContext);
  const open = menu.menu;
  // focus on certain field
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  // focus on certain field
  function onchange(e) {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  // submit function and send data after editing userdetails
  async function sub(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${backenduser}/add`, form);
      navigation("/dashboard/users");
    } catch (err) {
      console.log(err);
      err.response.status === 422 && seterr(err.response.data.message);
    }
    setok(true);
  }
  // submit function and send data after editing userdetails

  return (
    <div
      className={`  mr-3 bg-slate-100 p-3 shadow-inner ${
        open ? "col-span-8" : "col-span-11"
      }`}
    >
      <form className="form-edit" onSubmit={sub}>
        <label htmlFor="1">Name</label>
        <input
          ref={focus}
          className="inp"
          name="name"
          placeholder="type ur name"
          id="1"
          value={form.name}
          onChange={(e) => onchange(e)}
          type="text"
        ></input>
        {form.name.length <= 0 && ok && (
          <p
            className="err"
            style={{ color: "red", fontSize: "10px", margin: "0" }}
          >
            Username is required
          </p>
        )}
        <label htmlFor="2">Email</label>
        <input
          className="inp"
          name="email"
          placeholder="type ur email"
          value={form.email}
          onChange={(e) => onchange(e)}
          id="2"
          required
          type="email"
        ></input>
        {/* {err !== "" && <p className="err">{err}</p>} */}
        <label htmlFor="4">Password</label>
        <input
          className="inp"
          name="password"
          required
          placeholder="type ur Password"
          value={form.Pass}
          onChange={(e) => onchange(e)}
          id="4"
          type="password"
        ></input>
        <label htmlFor="3">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={(e) => onchange(e)}
          id="3"
          className="inp"
        >
          <option disabled value={""}>
            select Role
          </option>
          <option value={"1995"}>Admin</option>
          <option value={"2001"}>user</option>
          <option value={"1996"}>writer</option>
          <option value={"1999"}>ProductManger</option>
        </select>
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
          // disabled={
          //   name === "" || email === "" || pass === "" || role === ""
          //     ? true
          //     : false
          // }
        >
          Save
        </button>
      </form>
    </div>
  );
}
