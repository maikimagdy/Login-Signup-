import { useEffect, useRef, useState } from "react";
import { apiurl, backendreg } from "../../api/api";
import axios from "axios";
import Spinner from "../../components/Loading/Loading";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./Login";
export default function Register() {
  const [err, seterr] = useState("");
  const [loading, setloading] = useState(false);
  // to focus on an inp
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);
  // to focus on an inp

  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  function change(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  async function sub(e) {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post(`${apiurl}/${backendreg}`, form);
      const token = res.data.token;
      const cookie = Cookie();
      cookie.set("Bearer", token);
      setloading(false);
      window.location.pathname = "/dashboard";
    } catch (err) {
      console.log(err);
      setloading(false);
      if (err.response.status === 422) {
        seterr("Email is already been taken");
      } else {
        seterr("Intenrnal server err");
      }
    }
  }

  return (
    <>
      {loading && <Spinner />}
      <div className="container">
        <Link to="/login">Login </Link>
        <div className="row h-100">
          <form onSubmit={sub} className="form">
            <div className="w-30">
              <p className="mb-5">Register Now</p>
              <div className="inputreg mb-8">
                <input
                  id="name"
                  placeholder="Typer your name here"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                  minLength={1}
                  ref={focus}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="inputreg mb-8">
                <input
                  id="email"
                  placeholder="Typer your Email here"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={change}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputreg">
                <input
                  id="pass"
                  placeholder="Typer your Password here"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={change}
                  required
                  minLength={5}
                />
                <label htmlFor="pass">Password</label>
              </div>
              <button> Submit</button>
              <p className="or">Or</p>
              <div className="google-btn-reg">
                <a
                  href={"http://127.0.0.1:8000/login-google"}
                  className="btn-google"
                >
                  Register with google
                </a>
                <i className="fa-brands fa-google google-icon"></i>
              </div>
              {err != "" && <p className="err">{err} </p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
