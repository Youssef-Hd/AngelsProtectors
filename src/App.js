import "./App.css";
import Home from "./Pages/Home/Home";
import LocationPosts from "./Pages/OnDuty/LocationPosts";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import SOS from "./Pages/SOS/SOS";
import { Route, Routes } from "react-router-dom";
import Test from "./Pages/Testing/Test";
import Posts from "./Pages/Posts/Posts";
import CommentSection from "./Pages/Posts/Comments";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { useState } from "react";
import ThemeContext from './ThemeContext';




function App() {
  const [theme, setTheme] = useState('light'); // Set the initial theme to 'light'

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>

    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/onduty" element={<LocationPosts />} />
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
    </ThemeContext.Provider>

  );
}

export default App;
