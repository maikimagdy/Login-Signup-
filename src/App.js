import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Website/Home";
import Login from "./pages/Website/Login";
import Register from "./pages/Website/Register";
import Users from "./pages/Dashboard/Users";
import Google from "./pages/Website/Google";
import Dashboard from "./pages/Dashboard/Dachboard";
import RequireAuth from "./pages/Website/requireauth";
import User from "./pages/Dashboard/user";
import Adduser from "./pages/Dashboard/Adduser";
import Writer from "./pages/Dashboard/writer";
import Err404 from "./pages/Website/404";
import Categories from "./pages/Dashboard/Categorioes";
import AddCategory from "./pages/Dashboard/AddCategory";
import Editcat from "./pages/Dashboard/EditCAtegory";
import Products from "./pages/Dashboard/Products";
import AddProduct from "./pages/Dashboard/Addproduct";
import Back from "./pages/Website/AuthBack";
import Training from "./Udacity/Training";
import EditProduct from "./pages/Dashboard/EditProduct";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Back />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/auth/google/callback" element={<Google />} />

        <Route path="/*" element={<Err404 />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowed={[`1995`]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="user/add" element={<Adduser />} />
          </Route>
          <Route element={<RequireAuth allowed={["1995", "1999"]} />}>
            {/* for categories */}
            <Route path="categories" element={<Categories />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="categories/:id" element={<Editcat />} />
            <Route path="categories/:id" element={<Editcat />} />
            {/* for categories */}

            {/* for products */}

            <Route path="products" element={<Products />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="products/:id" element={<EditProduct />} />
            {/* <Route path="product/add" element={<AddProduct />} /> */}

            {/* for products */}
          </Route>
          <Route element={<RequireAuth allowed={["1996", "1995"]} />}>
            <Route path="writer" element={<Writer />} />
          </Route>
        </Route>
      </Routes>{" "}
    </div>
  );
}
