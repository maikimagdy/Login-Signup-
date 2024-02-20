import axios from "axios";
import { apiurl } from "./api";
import Cookie from "cookie-universal";
const cookie = new Cookie();
const token = cookie.get("Bearer");
export const Axios = axios.create({
  baseURL: apiurl,
  headers: {
    Authorization: "Bearer " + token,
  },
});
