import { useContext, useEffect, useState } from "react";
import { backenduser, backendusers } from "../../api/api";
import { MenuContext } from "../../components/context/menuContext";
import { Axios } from "../../api/axios";
import { Link } from "react-router-dom";
import Tableshow from "./Table";
import User from "./user";
import axios from "axios";
import Cookie from "cookie-universal";
export default function Users() {
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const [users, setusers] = useState([]);
  const [currentuser, setcurrentuser] = useState("");
  const [NoUsers, setNoUsers] = useState(false);
  const [res, setres] = useState();
  const cookie = new Cookie();
  const token = cookie.get("Bearer");
  // to solve reload prob when u del user u must reload each time we make use state and pu it in use effefct to change with e other
  const [del, setdel] = useState(false);

  // to solve reload prob when u del user u must reload each time we make use state and pu it in use effefct to change with e other

  // getting current user to not show it in the table
  useEffect(() => {
    Axios.get(`${backenduser}`).then((data) => setcurrentuser(data.data));
  }, []);

  // getting current user to not show it in the table

  const header = [
    {
      key: "id",
      name: "Id",
    },
    {
      key: "name",
      name: "Name",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  // const show = users.map((user, key) => (
  //   <tr key={key}>
  //     <td>{key + 1}</td>
  //     <td>
  //       {user.name === currentuser.name ? user.name + "(You)" : user.name}
  //     </td>
  //     <td>{user.email}</td>
  //     <td>
  //       {user.role === "1995"
  //         ? "Admin"
  //         : user.role === "2001"
  //         ? "User"
  //         : "writer"}
  //     </td>
  //   </tr>
  // ));
  useEffect(() => {
    Axios.get(`/${backendusers}`)
      .then((data) => setusers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [del]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/${backendusers}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setres(data))
      .catch((err) => console.log(err));
  }, []);
  // //   delete user
  async function Del(id) {
    try {
      const res = await Axios.delete(`${backenduser}/${id}`);
      setusers((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  // //   delete user

  return (
    <div
      className={`h-96 flex flex-col mr-4 p-2 transition-all bg-slate-100 h-100 p-5 shadow-inner ${
        open ? "col-span-8" : "col-span-11"
      }`}
    >
      <Link className="add-user w-24 self-end mb-2" to={"/dashboard/user/add"}>
        {
          <i
            className="fa-solid fa-user-plus"
            style={{ marginRight: "3px" }}
          ></i>
        }
        Add user
      </Link>

      <Tableshow
        header={header}
        data={users}
        delete={Del}
        currentuser={currentuser}
        word={users.length === 0 && NoUsers ? "No users found" : "Loading..."}
      />
    </div>
  );
}
