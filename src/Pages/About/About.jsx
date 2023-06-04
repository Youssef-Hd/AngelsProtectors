import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import logo from "../../assets/logo.png";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="About-Div">
      <div>
        <Nav />
        <img
          className="Heroimage-aboutpage"
          src="https://a-static.besthdwallpaper.com/five-short-coated-white-and-brown-puppies-wallpaper-1600x900-84107_47.jpg"
          // src="https://media.istockphoto.com/id/1161941988/photo/super-hero-dog.jpg?s=612x612&w=0&k=20&c=9TNGD8OyFF-L8UD4PmTC-KgKewIrki8NVGtV-9XX-ho="
          // src="https://media.gettyimages.com/id/1221625331/photo/superhero-dog-and-his-boy.jpg?s=612x612&w=0&k=20&c=B6UHRGhhg2kk3v6sBYp2WKkLqnDh8776PmgtShz1JMk="
          alt="imghero"
        />
      </div>
      <img className="Image-about" src={logo} />
      <p className="p-about">
        This platform was created for people to contribute helping stray dogs
        who are in need of rescuing all across Lebanon region.
        <br /> The application aim is for people to provide information and post
        it on here for other people or for the non profit organization to jump
        in and help those kind souls who are in need{" "}
      </p>
      <div className="Footer-about">
        <p className="p-protector">Become A Protector Now!</p>
        <Link to="/onduty" className="Link-about">
          <button className="btn-about">On Duty!</button>
        </Link>
        <Footer />
      </div>
     
    </div>
  );
};

export default About;
