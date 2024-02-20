import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../api/axios";
import { backenduser } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { MenuContext } from "../../components/context/menuContext";

export default function User() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const [role, setrole] = useState("");
  const focus = useRef(null);
  const [ok, setok] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const navigation = useNavigate();
  const { id } = useParams();

  // to get userdetails accord to user id

  useEffect(() => {
    Axios.get(`${backenduser}/${id}`)
      .then((data) => {
        setemail(data.data.email);
        setname(data.data.name);
        setrole(data.data.role);
        focus.current.focus();
      })
      .then(() => setdisabled(false))
      .catch(() => navigation("/dashboard/err", { replace: true }));
  }, []);
  // to get userdetails accord to user id

  // submit function and send data after editing userdetails
  async function sub(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${backenduser}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      console.log(res);
      navigation("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
    setok(true);
  }
  // submit function and send data after editing userdetails

  return (
    <div
      className={`h-100  bg-slate-100 p-3 ${
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
          value={name}
          onChange={(e) => setname(e.target.value)}
          type="text"
        ></input>
        {name.length <= 0 && ok && (
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
          value={email}
          required
          onChange={(e) => setemail(e.target.value)}
          id="2"
          type="email"
        ></input>
        <label htmlFor="3">Role</label>
        <select
          value={role}
          onChange={(e) => setrole(e.target.value)}
          id="3"
          className="inp"
        >
          <option disabled value={""}>
            select Role
          </option>
          <option value="1995">Admin</option>
          <option value="2001">user</option>
          <option value="1996">writer</option>
          <option value="1999">productManger</option>
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
          disabled={disabled}
        >
          Save
        </button>
      </form>
    </div>
  );
}
