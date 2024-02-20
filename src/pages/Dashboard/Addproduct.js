import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../api/axios";
import { cat, categories, prod } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../components/context/menuContext";

export default function AddProduct() {
  const [ok, setok] = useState(false);
  const [images, setimages] = useState([]);
  const [cats, setcat] = useState([]);
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const refs = useRef([]);
  const [send, setsend] = useState(false);
  // Ref to manage refs for images
  console.log(images);
  const [form, setform] = useState({
    category: "Select Category",
    description: "",
    title: "",
    price: "",
    discount: "",
    About: "",
  });
  // focus on a certain field
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  const selectimage = useRef(null);

  // focus on a certain field

  // Handle del function
  function HandleDel(id) {
    const newImages = [...images];
    newImages.splice(id, 1);
    setimages(newImages);
    refs.current.splice(id, 1);
  }
  // Handle del function

  // getting categories
  useEffect(() => {
    Axios.get(`${categories}`).then((data) => setcat(data.data));
  }, []);

  // Mapping
  const showcats = cats.map((e, key) => (
    <option key={key} value={e.id}>
      {e.title}
    </option>
  ));

  const showImages = images.map((img, i) => (
    <div
      key={i}
      style={{
        gap: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* to show images inside src which type is file we use src={URL.createObjectURL(img)} */}
      <div
        // Push the ref into the refs array
        ref={(ref) => refs.current.push(ref)}
        style={{
          display: "flex",
          height: "70px",
        }}
        // Push the ref into the refs array
      >
        <img src={URL.createObjectURL(img)} width="50px" className="ml-2" />
        <div>
          <p>{img.name}</p>
          <p>{(img.size / 1024).toFixed() + "kb"}</p>
        </div>
      </div>

      <button className="delete-btn" onClick={() => HandleDel(i)}>
        Delete
      </button>
    </div>
  ));

  // submit function and send data after editing userdetails
  async function sub(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("category", form.category);
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("discount", form.discount);
    data.append("About", form.About);

    for (let index = 0; index < images.length; index++) {
      data.append("images[]", images[index]);
    }

    try {
      const res = await Axios.post(`${prod}/add`, data);
      console.log(res);
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      console.log(err);
    }
    setok(true);
  }

  function change(e) {
    setform({ ...form, [e.target.name]: e.target.value });
    setsend(true);
  }

  return (
    <div
      className={` mr-3 bg-slate-100 p-3 ${
        open ? "col-span-8" : "col-span-11"
      }`}
    >
      <form className="form-edit" onSubmit={sub}>
        <h2>Add Product</h2>
        <label htmlFor="6">Category</label>
        <select
          id="6"
          ref={focus}
          className="inp"
          value={form.category}
          onChange={change}
          name="category"
        >
          <option disabled> Select Category</option>
          {showcats}
        </select>
        <label htmlFor="1">title</label>
        <input
          className="inp"
          name="title"
          placeholder="Title"
          id="1"
          value={form.title}
          onChange={change}
          type="text"
          required
          disabled={!send}
        ></input>
        <label htmlFor="5">Description</label>
        <input
          className="inp"
          name="description"
          placeholder="desc"
          id="5"
          value={form.description}
          onChange={change}
          type="text"
          required
          disabled={!send}
        ></input>
        <label htmlFor="2">Price</label>
        <input
          className="inp"
          name="price"
          placeholder="price"
          id="1"
          value={form.price}
          onChange={change}
          type="text"
          required
          disabled={!send}
        ></input>
        <label htmlFor="3">Discount</label>
        <input
          className="inp"
          name="discount"
          placeholder="Discount"
          id="3"
          value={form.discount}
          onChange={change}
          type="text"
          required
          disabled={!send}
        ></input>

        <label htmlFor="4">About</label>
        <input
          className="inp"
          name="About"
          placeholder="about"
          id="4"
          value={form.About}
          onChange={change}
          type="text"
          disabled={!send}
        ></input>
        <label htmlFor="9">Images</label>
        <input
          ref={selectimage}
          hidden
          multiple
          className="inp"
          id="9"
          onChange={(e) => setimages((prev) => [...prev, ...e.target.files])}
          type="file"
          disabled={!send}
        ></input>
        <div
          onClick={() => selectimage.current.click()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `2px dashed  ${send ? "#1096E1" : "grey"} `,
            padding: "30px",
            cursor: send ? "pointer" : "",
          }}
        >
          <img
            src={require("../../Upload-PNG-HD-Image.png")}
            width="100x"
            style={{ filter: !send && "grayscale(1)" }}
          />
          <p style={{ color: send ? "#1096E1" : "grey", fontWeight: "bold" }}>
            Upload here
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {showImages}
        </div>
        <button
          style={{
            width: "100px",
            border: "none",
            backgroundColor: "#1096E1",
            padding: "10px",
            borderRadius: "6px",
            color: "white",
            fontSize: "16px",
            cursor: send ? "pointer" : "",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
