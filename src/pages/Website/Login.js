import { useEffect, useRef, useState } from "react";
import { apiurl, backendlogin, backendreg } from "../../api/api";
import axios from "axios";
import Spinner from "../../components/Loading/Loading";
import Cookie from "cookie-universal";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");
  const Navigate = useNavigate();

  // to focus on an inp
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);
  // to focus on an inp

  const [form, setform] = useState({
    email: "",
    password: "",
  });
  function change(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  async function sub(e) {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post(`${apiurl}/${backendlogin}`, form);
      setloading(false);
      const token = res.data.token;
      const cookie = Cookie();
      cookie.set("Bearer", token);
      const role = res.data.user.role;
      const to = role === "1995" ? "users" : "writer";
      window.location.pathname = `/dashboard/${to}`;
    } catch (err) {
      setloading(false);
      console.log(err);
      if (err.response.status === 401) {
        seterr(err.response.data.error);
      } else {
        seterr("internal server error");
      }
    }
  }

  return (
    <>
      {loading && <Spinner />}
      <div className="container">
        <Link to="/register">register </Link>

        <div className="row h-100">
          <form onSubmit={sub} className="form">
            <div className="w-30 ">
              <p className="mb-5">Login</p>

              <div className="inputreg mb-8">
                <input
                  id="email"
                  placeholder="Typer your Email here"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={change}
                  required
                  ref={focus}
                />
                <label htmlFor="email" className="">
                  Email
                </label>
              </div>
              <div className="inputreg ">
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
              <button> Login</button>
              <p className="or">OR</p>
              <div className="google-btn">
                <a
                  href={"http://127.0.0.1:8000/login-google"}
                  className="btn-google"
                >
                  Sign in with google
                </a>
                <i className="fa-brands fa-google google-icon"></i>
              </div>
              {err !== "" && <p className="err">{err}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
