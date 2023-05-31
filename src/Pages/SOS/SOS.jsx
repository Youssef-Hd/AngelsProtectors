import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import Search from "../../components/SearchBar/Search";
import "./Sos.css";

const SOS = () => {
  const [click, setClick] = useState(null);
  const toggle = (i) => {
    if (click === i) {
      return setClick(null);
    }
    setClick(i);
  };
  return (
    <div>
      <Nav />
      <Search />
      <div>
      <br />
        <div className="accordion">
          <h1 className="h1-sos">List Of The Available NGO'S</h1>
          <br />
          {Sos.map((item, i) => (
            <div className="papadiv">
              <div className="name-sos" onClick={() => toggle(i)}>
                <h3 className="h3-name">{item.Name}</h3>
                {click === i ? (
                  <IoArrowRedoCircleOutline className="up-arrow" />
                ) : (
                  <IoArrowRedoCircleOutline className="down-arrow" />
                )}

              </div>
              <br />
              <div className={click === i ? "adress-sos.show" : "adress-sos"}>
                <li className="li-styling">
                  Location:{item.Adress}
                  <br />
                  PhoneNumber:{item.phoneNumber}
                </li>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

const Sos = [
  {
    Name: " Animals Lebanon",
    phoneNumber: +9611751678,
    Adress: "Hamra, Beirut",
  },
  {
    Name: " Mt Lebanon Dog Shelter ",
    phoneNumber: 2472482,
    Adress: "Aley, Mount Lebanon",
  },
  {
    Name: " Beta Lebanon",
    phoneNumber: 70 - 248765,
    Adress: "Baabda",
  },
  {
    Name: " Adopt Dont Shop",
    phoneNumber: +96171533202,
    Adress: "Unavailable",
  },
  {
    Name: " CARE International",
    phoneNumber: "01381775",
    Adress: "Beirut-Badaro",
  },
  {
    Name: " Animal Lives Lebanon",
    phoneNumber: 81869264,
    Adress: "Lebanon-Tyre",
  },
  {
    Name: "The Kennel Club of Lebanon",
    phoneNumber: "01303145",
    Adress: "Lebanon-Beirut",
  },
];

export default SOS;
