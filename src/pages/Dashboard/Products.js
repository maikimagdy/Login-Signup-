import { useContext, useEffect, useState } from "react";
import { categories, prod, prods } from "../../api/api";
import { MenuContext } from "../../components/context/menuContext";
import { Axios } from "../../api/axios";
import { Link } from "react-router-dom";
import Tableshow from "./Table";
export default function Products() {
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const [products, setproducts] = useState([]);
  console.log(products);
  const [NoProds, setNoProds] = useState(false);

  // to solve reload prob when u del user u must reload each time we make use state and pu it in use effefct to change with e other
  const [del, setdel] = useState(false);

  // to solve reload prob when u del user u must reload each time we make use state and pu it in use effefct to change with e other

  useEffect(() => {
    Axios.get(`/${prods}`)
      .then((data) => setproducts(data.data))
      .then(() => setNoProds(true))
      .catch((err) => console.log(err));
  }, []);

  //   delete user
  async function Del(id) {
    try {
      const res = await Axios.delete(`${prod}/${id}`);
      setproducts((prev) => prev.filter((item) => item.id !== id));
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
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    ,
    {
      key: "images",
      name: "Images",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];

  return (
    <div
      className={`h-96 flex flex-col mr-4 transition-all  bg-slate-100 h-100 p-3 ${
        open ? "col-span-8" : "col-span-11"
      }`}
    >
      <Link
        className="add-user w-24 self-end mb-2"
        to={"/dashboard/Product/add"}
      >
        Add product
      </Link>
      <Tableshow
        header={header}
        data={products}
        delete={Del}
        currentuser={false}
        word={
          products.length === 0 && NoProds ? "No Products found" : "Loading..."
        }
      />
    </div>
  );
}
