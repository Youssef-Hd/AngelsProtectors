import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
// import logo from '../../../public/logo.png'
import logo from "../../assets/logo.png";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="About-Div">
      <div>
        <Nav />
      </div>
      <img className="Image-about" src={logo} />
      <p className="p-about">
        This platform was created for people to contribute helping stray dogs
        who are in need of rescuing all across Lebanon region. The application
        aim is for people to provide information and post it on here for other
        people or for the non profit organization to jump in and help those kind
        souls who are in need{" "}
      </p>
      <p className="p-protector">
        Become A Protector Now!
      </p>
      <Link to='/onduty' className="Link-about">
      <button className="btn-about">On Duty!</button>
      </Link>
      <div className="Footer-about">
      </div>
        <Footer />
    </div>
  );
};

export default About;
