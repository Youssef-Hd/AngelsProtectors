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
  const storedId = sessionStorage.getItem('id');

  const handleEvent = async (e) => {
    if(storedId){
    e.preventDefault();
    var data = { fullName, emailus, number };
    await emailjs.send(
      "service_23mb70i",
      "template_zlb0v2q",
      data,
      "j429KtCwAVKA1nhue"
    );

    setFullName("");
    setEmailus("");
    setNumber("");
    setSubject("")
  }else{
    alert("please sign in")
  }
  };


  return (
    <div className="Contact-div">
      <div>
        <Nav />
      </div>
      <img className="Image-contact" src={logo} alt="logo" />
      <input placeholder="Full Name"
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
      <input
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
      <Footer />
    </div>
  );
};

export default Contact;