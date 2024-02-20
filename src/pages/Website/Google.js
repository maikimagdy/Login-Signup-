import axios from "axios";
import { useEffect } from "react";
import { apiurl, googleback } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
export default function Google() {
  const location = useLocation();
  const cookie = Cookie();
  const Navigate = useNavigate();
  useEffect(() => {
    async function GoogleBack() {
      try {
        const res = await axios.get(
          `${apiurl}/${googleback}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("Bearer", token);
        Navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
    GoogleBack();
  }, []);

  return <div>google</div>;
}
