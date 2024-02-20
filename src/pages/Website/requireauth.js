import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { backenduser } from "../../api/api";
import Spinner from "../../components/Loading/Loading";
import { Axios } from "../../api/axios";
import Err403 from "./403err";
export default function RequireAuth({ allowed }) {
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${backenduser}`)
      .then((data) => setuser(data.data))
      .catch(() => navigate("/login"));
  }, []);
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  return token ? (
    user === "" ? (
      <Spinner />
    ) : allowed.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
