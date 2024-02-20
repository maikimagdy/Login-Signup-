import { useContext, useEffect, useState } from "react";
import { cat, categories } from "../../api/api";
import { MenuContext } from "../../components/context/menuContext";
import { Axios } from "../../api/axios";
import { Link } from "react-router-dom";
import Tableshow from "./Table";
export default function Categories() {
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const [cate, setcat] = useState([]);
  const [Nocats, setNoCats] = useState(false);

  useEffect(() => {
    Axios.get(`/${categories}`)
      .then((data) => setcat(data.data))
      .then(() => setNoCats(true))
      .catch((err) => console.log(err));
  }, []);
  console.log(cate);
  //   delete Category
  async function Del(id) {
    try {
      const res = await Axios.delete(`${cat}/${id}`);
      setcat((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  //   delete user

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  return (
    <div
      className={`h-96 flex flex-col mr-4 transition-all shadow-inner bg-slate-100 h-100 p-3 ${
        open ? "col-span-8" : "col-span-11"
      }`}
    >
      <Link
        className="add-user w-28 self-end mb-2"
        to={"/dashboard/category/add"}
      >
        Add Category
      </Link>
      <Tableshow
        header={header}
        data={cate}
        delete={Del}
        currentuser=""
        word={
          cate.length === 0 && Nocats ? "No Categories found" : "Loading..."
        }
      />
    </div>
  );
}
