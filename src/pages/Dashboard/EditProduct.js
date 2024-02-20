import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../api/axios";
import { prod } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { MenuContext } from "../../components/context/menuContext";

export default function EditProduct() {
  const [ok, setok] = useState(false);
  const [images, setimages] = useState([]);
  const [imagesarr, setimagesarr] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const menu = useContext(MenuContext);
  const open = menu.menu;
  const refs = useRef([]);
  const selectimage = useRef(null); // Initialize selectimage ref
  const [form, setform] = useState({
    category: "Select Category",
    description: "",
    title: "",
    price: "",
    discount: "",
    About: "",
  });

  const focus = useRef(null);

  useEffect(() => {
    Axios.get(`${prod}/${id}`).then((data) => {
      setimagesarr(data.data[0].images);
      setform(data.data[0]);
    });
  }, [id]);

  const showimgsarr = imagesarr.map((img, i) => (
    <div className="flex justify-between" key={i}>
      <img src={img.image} width="50px" height="50px" />
      <button className="delete-btn" onClick={() => handleDelarr(i)}>
        Delete
      </button>
    </div>
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
      <div ref={(ref) => refs.current.push(ref)}>
        <img src={URL.createObjectURL(img)} width="50px" className="ml-2" />
        <div>
          <p>{img.name}</p>
          <p>{(img.size / 1024).toFixed() + "kb"}</p>
        </div>
      </div>
      <button className="delete-btn" onClick={() => handleDel(i)}>
        Delete
      </button>
    </div>
  ));

  const handleDel = (id) => {
    const newImages = [...images];
    newImages.splice(id, 1);

    const newRefs = [...refs.current];
    newRefs.splice(id, 1);

    setimages(newImages);
    refs.current = newRefs;
  };

  const handleDelarr = (id) => {
    const newImagesarr = [...imagesarr];
    newImagesarr.splice(id, 1);

    const newRefs = [...refs.current];
    newRefs.splice(id, 1);

    setimagesarr(newImagesarr);
    refs.current = newRefs;
  };

  const sub = async (e) => {
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
      const res = await Axios.post(`${prod}/edit/${id}`, data);
      console.log(res);
      navigate("/dashboard/products");
    } catch (err) {
      console.log(err);
    }
    setok(true);
  };

  const change = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`mr-3 bg-slate-100 p-3 ${open ? "col-span-8" : "col-span-11"}`}
    >
      <form className="form-edit" onSubmit={sub}>
        <h2>Edit Product</h2>
        <label htmlFor="6">Category</label>
        <select
          id="6"
          ref={focus}
          className="inp"
          value={form.category}
          onChange={change}
          name="category"
        >
          <option disabled>Select Category</option>
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
        ></input>
        <div
          onClick={() => selectimage.current.click()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <img
            src={require("../../Upload-PNG-HD-Image.png")}
            width="100x"
            style={{ cursor: "pointer", filter: "grayscale(1)" }}
          />
          <p style={{ fontWeight: "bold" }}>Upload here</p>
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
          {showimgsarr}
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
          }}
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
