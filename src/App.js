import "./App.css";
import Home from "./Pages/Home/Home";
import OnDuty from "./Pages/OnDuty/OnDuty";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import SOS from "./Pages/SOS/SOS";
import { Route, Routes } from "react-router-dom";
import Test from "./Pages/Testing/Test";
import Posts from "./Pages/Posts/Posts";
import CommentSection from "./Pages/Posts/Comments";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/onduty" element={<OnDuty />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/test" element={<Test />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/comment" element={<CommentSection />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
