import "./App.css";
import Home from "./Pages/Home/Home";
import OnDuty from "./Pages/OnDuty/OnDuty";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import SOS from "./Pages/SOS/SOS";
import { Route, Routes } from "react-router-dom";
import Test from "./Pages/Testing/Test";
import Posts from "./Pages/Posts/Posts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/onduty" element={<OnDuty />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/test" element={<Test />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
