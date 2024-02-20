import { Link } from "react-router-dom";

export default function Tableshow(props) {
  const currentuser = props.currentuser || {
    name: "",
  };
  const headershow = props.header.map((head) => <th>{head.name}</th>);

  const datashow = props.data.map((item) => (
    <tr>
      {props.header.map((header) => (
        <td>
          {header.key === "image" ? (
            <img src={item[header.key]} width="50px" height="50px" />
          ) : item[header.key] === "1995" ? (
            "Admin"
          ) : header.key === "images" ? (
            <div className="flex gap-1 flex-row flex-nowrap w-14 ">
              {item[header.key].map((e) => (
                <img src={e.image} />
              ))}
            </div>
          ) : item[header.key] === "2001" ? (
            "user"
          ) : item[header.key] === "1996" ? (
            "writer"
          ) : item[header.key] === "1999" ? (
            "ProductManger"
          ) : (
            item[header.key]
          )}
          {currentuser &&
            item[header.key] === props.currentuser.name &&
            "(You)"}
        </td>
      ))}
      <td>
        <Link to={`${item.id}`}>
          <i className="fa-solid fa-pen-to-square edit-icon"></i>
        </Link>
        {currentuser.name !== item.name && (
          <i
            className="fa-solid fa-trash del-icon"
            onClick={() => props.delete(item.id)}
          ></i>
        )}
      </td>
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr>
          {headershow}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length === 0 && (
          <tr>
            <td colSpan={10}>{props.word}</td>
          </tr>
        )}
        {datashow}
      </tbody>
    </table>
  );
}
