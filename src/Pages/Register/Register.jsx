import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/logo.png";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://angelsprotectorss.onrender.com/api/user/register",
        {
          name,
          email,
          password,
          phoneNumber,
        }
      );

      const user = response.data;
      console.log(user); // Handle the user object as needed

      setRedirectToLogin(true);
      // Redirect the user or perform any other actions
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  if (redirectToLogin) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="logo-div">
        <img className="logo-register" src={logo} alt="logo" />
      </div>
      <div>
        <p className="title-register">Create Your Account</p>
      </div>
      <br />
      <br />
      <div className="input-div-register">
        <input
          type="email"
          value={email}
          placeholder="Email"
          className="input-User"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          placeholder="Full Name"
          className="input-User-register"
        />
        <br />

        <input
          type="text"
          value={phoneNumber}
          placeholder="Phone Number"
          className="input-User-register"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          value={password}
          placeholder="Password"
          className="input-User-register"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <div className="div-btn-register">
          <button onClick={handleRegister} className="register-btn">Create Account</button>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Register;
