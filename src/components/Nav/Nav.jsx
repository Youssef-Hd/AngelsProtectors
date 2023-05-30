import Hamburger from "./Hamburger";
import { useState } from "react";
import "./Nav.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Nav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const [headername, setheadername] = useState("");

  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    headerName();
  }, [headername]);

  const headerName = () => {
    if (location.pathname == "/about") {
      setheadername("About Us");
    } else if (location.pathname == "/") {
      setheadername("Home");
    } else if (location.pathname == "/onduty") {
      setheadername("On Duty");
    } else if (location.pathname == "/contact") {
      setheadername("Contact Us");
    } else if (location.pathname == "/sos") {
      setheadername("SOS");
    } else if (location.pathname == "/posts") {
      setheadername("Posts");
    } else if (location.pathname == "/login") {
      setheadername("Login");
    }else if (location.pathname == "/register") {
      setheadername("Register")
    }
  };

  return (
    <div>
      <div className="navigation">
        <div className="hamburger" onClick={toggleHamburger}>
          <Hamburger isOpen={hamburgerOpen} />
        </div>
        <h1 className="H1-Header">{headername}</h1>
        <FaUserAlt id="User-icon" />

        <ul className={hamburgerOpen ? "show" : "hide"}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setHamburgerOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/onduty"
            className="nav-link"
            onClick={() => setHamburgerOpen(false)}
          >
            On Duty
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setHamburgerOpen(false)}
          >
            About us
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setHamburgerOpen(false)}
          >
            Contact us
          </Link>
          <Link
            to="/sos"
            className="nav-link"
            onClick={() => setHamburgerOpen(false)}
          >
            SOS
          </Link>{" "}
          <Link
            to="/posts"
            className="nav-link"
            onClick={() => setHamburgerOpen(false)}
          >
            Posts
          </Link>
        </ul>
      </div>
    </div>
  );
}
