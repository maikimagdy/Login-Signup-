import { useState } from "react";
import logo from "../logo.svg";

export default function Training(props) {
  const [inp, setinp] = useState("");
  console.log(inp);

  const { contacts } = props;
  const { handledel } = props;
  let showing =
    inp === ""
      ? contacts
      : contacts.filter((e) =>
          e.name.toLowerCase().includes(inp.toLocaleLowerCase())
        );
  function showall() {
    setinp("");
  }
  // EXercise 3
  // const profiles = [
  //   {
  //     id: 1,
  //     userID: "1",
  //     favoriteMovieID: "1",
  //   },
  //   {
  //     id: 2,
  //     userID: "2",
  //     favoriteMovieID: "1",
  //   },
  //   {
  //     id: 3,
  //     userID: "4",
  //     favoriteMovieID: "5",
  //   },
  //   {
  //     id: 4,
  //     userID: "5",
  //     favoriteMovieID: "2",
  //   },
  //   {
  //     id: 5,
  //     userID: "3",
  //     favoriteMovieID: "5",
  //   },
  //   {
  //     id: 6,
  //     userID: "6",
  //     favoriteMovieID: "4",
  //   },
  // ];

  // const users = {
  //   1: {
  //     id: 1,
  //     name: "Jane Cruz",
  //     userName: "coder",
  //   },
  //   2: {
  //     id: 2,
  //     name: "Matthew Johnson",
  //     userName: "mpage",
  //   },
  //   3: {
  //     id: 3,
  //     name: "Autumn Green",
  //     userName: "user123",
  //   },
  //   4: {
  //     id: 4,
  //     name: "John Doe",
  //     userName: "user123",
  //   },
  //   5: {
  //     id: 5,
  //     name: "Lauren Carlson",
  //     userName: "user123",
  //   },
  //   6: {
  //     id: 6,
  //     name: "Nicholas Lain",
  //     userName: "user123",
  //   },
  // };

  // const movies = {
  //   1: {
  //     id: 1,
  //     name: "Planet Earth 1",
  //   },
  //   2: {
  //     id: 2,
  //     name: "Selma",
  //   },
  //   3: {
  //     id: 3,
  //     name: "Million Dollar Baby",
  //   },
  //   4: {
  //     id: 4,
  //     name: "Forrest Gump",
  //   },
  //   5: {
  //     id: 5,
  //     name: "Get Out",
  //   },
  // };

  // const newobj = Object.entries(movies).map(([key, value]) => ({
  //   movie: value.name,
  //   users: profiles
  //     .filter((p) => p.favoriteMovieID == value.id)
  //     .map((e) => users[e.favoriteMovieID]),
  // }));
  // EXercise 3
  console.log(showing);
  return (
    <div>
      <div>
        <input
          style={{
            width: "70%",
            padding: "10px",
            marginLeft: "15px",
            border: "1px solid gray",
          }}
          value={inp.trim()}
          onChange={(e) => setinp(e.target.value.trim())}
          type="text"
          placeholder="search"
        />
      </div>
      <ol>
        {inp.length > 0 && (
          <>
            {showing.length === 0 ? (
              <p className="text-red-400 ml-80">No users found</p>
            ) : (
              <p className="text-red-400 ml-80">
                {`showing ${showing.length} of ${contacts.length}`}
                <button
                  onClick={showall}
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    padding: "5px",
                    margin: "10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  show all
                </button>
              </p>
            )}
          </>
        )}

        {showing.map((contact) => (
          <li id="parent">
            <div className="flex justify-between p-10 bg-gray-200 m-5">
              <div className=" h-40 flex justify-between items-center">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "1px solid black",
                    backgroundImage: `URL(${contact.avatarURL})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    marginRight: "20px",
                  }}
                ></div>
                <div
                  style={{
                    height: "100px",
                    borderLeft: "1px solid gray",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  <h1>{contact.name}</h1>
                  <h3>@{contact.handle}</h3>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handledel(contact.id)}
                  style={{
                    backgroundColor: "red",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
      {/* {newobj.map((obj) => (
        <li>
          {obj.movie} ////{" "}
          {obj.users.length <= 0 ? (
            "No one loves this"
          ) : (
            <span>{obj.users.map((e) => e.name)}</span>
          )}{" "}
        </li>
      ))} */}
    </div>
  );
}
