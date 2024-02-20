import { useNavigate } from "react-router-dom";
import "./404.css";
export default function Err404() {
  const nav = useNavigate();

  return (
    <section className="page_404">
      <div className="containers">
        <div className="rows">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center " style={{ textAlign: "center" }}>
                  404
                </h1>
              </div>
              <div className="contant_box_404" style={{ textAlign: "center" }}>
                <h3 className="hs2" style={{ textAlign: "center" }}>
                  Look like you're lost
                </h3>
                <p>the page you are looking for not avaible!</p>
                <a
                  classname="link4"
                  style={{
                    borderRadius: "5px",
                  }}
                  onClick={() => nav("/")}
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
