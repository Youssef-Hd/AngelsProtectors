import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  // Destructure the history object from props
  const [redirectToHome, setRedirectToHome] = useState(false); // Track redirection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://angelsprotectorss.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        sessionStorage.setItem("id", user._id);

        setRedirectToHome(true);

        // Handle the user object as needed
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="papa-div-login">
        <div>
          <Nav />
        </div>
        <div className="logo-div">
          <img className="logo-login" src={logo} alt="logo" />
        </div>
        <div>
          <p className="title-login">Login To Your Account</p>
        </div>
        <br />
        <br />
        <div className="input-div-login">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-User"
          />
          <br />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-User"
          />
          <div className="div-btn-login">
            <button onClick={handleSubmit} type="submit" className="Login-btn">
              Login
            </button>
          </div>
        </div>
        <div className="div-register-btn-login">
          <h3 className="h3-register">Not a user yet?</h3>
          <Link to="/register">
            <button className="register-btn-login">Register Account</button>
          </Link>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Login;
