import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { backendusers } from "../api/api";
import Cookie from "cookie-universal";
export default function Component() {
  // Exercise1
  //   const [inp, setinp] = useState("");
  //   return (
  //     <div className="container">
  //       <input
  //         type="text"
  //         placeholder="Say Something"
  //         value={inp}
  //         onChange={(e) => setinp(e.target.value)}
  //       />
  //       <p className="echo">Echo:</p>
  //       <p>{inp}</p>
  //     </div>
  //   );
  // Exercise1

  // Exercise2

  //   // to get inputs value
  //   const [form, setform] = useState({
  //     firstname: "",
  //     lastname: "",
  //     username: "",
  //     games: 0,
  //   });

  //   // to save inputs value after typing in arr to show
  //   const [showlist, setlist] = useState([]);

  //   const [err, seterr] = useState(false);

  //   const [showgame, setshowgame] = useState(false);

  //   function change(e) {
  //     setform((form) => ({ ...form, [e.target.name]: e.target.value }));
  //     seterr(false);
  //   }

  //   function sub(e) {
  //     e.preventDefault();
  //     // showing p that said username taken
  //     if (showlist.some((user) => user.username === form.username)) {
  //       seterr(true);
  //     }
  //     // showing p that said username taken

  //     setlist((prev) => [
  //       ...prev,
  //       {
  //         firstname: form.firstname,
  //         lastname: form.lastname,
  //         username: form.username,
  //         games: 0,
  //       },
  //     ]);
  //   }
  //   // filter array to not show same user name content
  //   const filteredShowlist = showlist.reduce((acc, curr, i, arr) => {
  //     if (i === 0 || curr.username !== arr[i - 1].username) {
  //       acc.push(curr);
  //     }

  //     return acc;
  //   }, []);
  //   // // we can use filter like this :
  //   // const filteredShowlist = showlist.filter((user, i, arr) => {
  //   //   return i === 0 || user.username !== arr[i - 1];
  //   // });

  //   // filter array to not show same user name content

  //   // showing users by mapping on list and return ol
  //   const listshow = filteredShowlist.map((user, key) => {
  //     return (
  //       <div key={user.username}>
  //         <ol className="m-8">
  //           <li>
  //             <p>firstname: {user.firstname}</p>
  //             <p>lastname: {user.lastname}</p>
  //             <p>username:{user.username}</p>
  //             <button
  //               onClick={showgames}
  //               style={{
  //                 color: "white",
  //                 backgroundColor: "red",
  //                 padding: "5px",
  //                 margin: "10px",
  //                 cursor: "pointer",
  //                 borderRadius: "5px",
  //               }}
  //             >
  //               {showgame ? "hide games played" : "show games played"}{" "}
  //             </button>

  //             <button
  //               onClick={() => play(user.username)}
  //               style={{
  //                 color: "white",
  //                 backgroundColor: "red",
  //                 padding: "5px",
  //                 margin: "10px",
  //                 cursor: "pointer",
  //                 borderRadius: "5px",
  //               }}
  //             >
  //               Play
  //             </button>
  //           </li>
  //         </ol>
  //         {showgame && <p>games played : {user.games}</p>}{" "}
  //       </div>
  //     );
  //   });
  //   // showing users by mappin on list and return ol

  //   // function that increase num of games played
  //   function play(username) {
  //     setlist((prev) =>
  //       prev.map((user) =>
  //         user.username === username ? { ...user, games: user.games + 1 } : user
  //       )
  //     );
  //   }
  //   // function that increase num of games played

  //   function showgames() {
  //     setshowgame((prev) => !prev);
  //   }
  //   return (
  //     <div>
  //       <form onSubmit={sub}>
  //         <div>
  //           <input
  //             type="text"
  //             placeholder="FirstName"
  //             name="firstname"
  //             value={form.firstname}
  //             onChange={change}
  //             style={{
  //               border: "1px solid red",
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="text"
  //             placeholder="LastName"
  //             name="lastname"
  //             value={form.lastname}
  //             onChange={change}
  //             style={{
  //               border: "1px solid red",
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="text"
  //             placeholder="UniqueName"
  //             name="username"
  //             value={form.username}
  //             onChange={change}
  //             style={{
  //               border: "1px solid red",
  //             }}
  //           />
  //           {err && <p className="text-red-400 font-b">user name taken</p>}
  //         </div>
  //         <button
  //           type="submit"
  //           style={{
  //             color: "white",
  //             backgroundColor: "red",
  //             padding: "5px",
  //             margin: "10px",
  //             cursor: "pointer",
  //             borderRadius: "5px",
  //           }}
  //           disabled={
  //             form.firstname === "" ||
  //             form.lastname === "" ||
  //             form.username === ""
  //               ? true
  //               : false
  //           }
  //         >
  //           Add
  //         </button>
  //       </form>

  //       <div className="flex ">{listshow}</div>
  //     </div>
  //   );
  // }

  // // Exercise2

  // Exercise 3 chat windows
  const [emmy, setemmy] = useState("");
  const [jhon, setjhon] = useState("");
  const [data, setdata] = useState([]);
  const [res, setres] = useState();
  const cookie = new Cookie();
  const token = cookie.get("Bearer");

  const date = new Date("5");
  console.log(date);

  function send() {
    setdata((prev) => [
      ...prev,
      {
        jhon: emmy,
        emmy: jhon,
      },
    ]);
    setemmy("");
    setjhon("");
  }
  const showjhon = data.map((e) => <p>{e.jhon}</p>);
  const showemmy = data.map((e) => <p>{e.emmy}</p>);

  return (
    <div>
      <div>
        {" "}
        <label htmlFor="1">Emmy</label>
        <input
          value={emmy}
          onChange={(e) => setemmy(e.target.value)}
          id="1"
          style={{
            border: "1px solid #ddd",
            margin: "5px",
            padding: "20px",
          }}
        ></input>
        {emmy.length > 0 && <button onClick={send}>send</button>}
      </div>
      <div>
        <label htmlFor="2">John</label>
        <input
          value={jhon}
          onChange={(e) => setjhon(e.target.value)}
          id="2"
          style={{
            margin: "5px",
            border: "1px solid #ddd",
            padding: "20px",
          }}
        ></input>
        {jhon.length > 0 && <button onClick={send}>send</button>}
      </div>
      <div className="flex justify-between w-80">
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Emmy chat:
          {showemmy}
        </div>
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            textAlign: "center",
            padding: "10px",
          }}
        >
          jhon chat:
          {showjhon}
          <p></p>
        </div>
      </div>
    </div>
  );
}
// Exercise 3
