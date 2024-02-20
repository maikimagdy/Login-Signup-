import { backendlogout } from "../../api/api";
import { Axios } from "../../api/axios";
import Cookie from "cookie-universal";
export default function Logout() {
  const cookie = Cookie();
  async function logout() {
    try {
      await Axios.get(`/${backendlogout}`);
      cookie.removeAll(); // Clear cookies
      window.location.pathname = "/login"; // Redirect to the login page
    } catch (err) {
      console.log(err);
    }
  }

  return <button onClick={logout}>Logout</button>;
}
