import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";
export default function Back() {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  return token ? window.history.back() : <Outlet />;
}
