import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  // Destructure the history object from props
  const [redirectToHome, setRedirectToHome] = useState(false); // Track redirection

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log(user);

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
    <div>
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
          placeholder="Username"
          className="input-User"
        />
        <br />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passowrd"
          className="input-User"
        />
        <br />
        <br />
        <br />
        <div className="div-btn-login">
          <button onClick={handleSubmit} type="submit" className="Login-btn">
            Login
          </button>
          <button className="register-btn">Register New Account</button>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}

      <br />
      <Footer />
    </div>
  );
};

export default Login;
