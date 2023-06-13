import React from "react";
import Nav from "../../components/Nav/Nav";
import logo from "../../assets/logo.png";
import "./Contact.css";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [emailus, setEmailus] = useState("");
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState(null);
  const storedId = sessionStorage.getItem("id");

  const myservicekey = process.env.REACT_APP_SERVICE_KEY;
  const templatekey = process.env.REACT_APP_TEMPLATE_KEY;
  const publickey = process.env.REACT_APP_PUBLIC_KEY;

  const handleEvent = async (e) => {
    if (storedId) {
      e.preventDefault();
      var data = { fullName, emailus, number };
      await emailjs.send( myservicekey, templatekey, data, publickey,);

      setFullName("");
      setEmailus("");
      setNumber("");
      setSubject("");
    } else {
      alert("please sign in");
    }
  };

  return (
    <div className="Contact-div">
      <div>
        <Nav />
      </div>
      <img className="Image-contact" src={logo} alt="logo" />
      <input
        placeholder="Full Name"
        onChange={(e) => {
          setFullName(e.target.value);
        }}
        value={fullName}
        className="border-fullname"
      />
      <input
        placeholder="Number"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        value={number}
        className="border-number"
      />
      <input
        placeholder="Subject"
        onChange={(e) => {
          setSubject(e.target.value);
        }}
        value={subject}
        className="border-subject"
      />
      <textarea
        placeholder="Email us"
        onChange={(e) => {
          setEmailus(e.target.value);
        }}
        value={emailus}
        className="contact-email"
      />
      <button onClick={handleEvent} className="submit-contact">
        Submit
      </button>
      <div className="footer-contact">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
