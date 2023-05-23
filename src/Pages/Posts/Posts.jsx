import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [infoImage, setInfoImage] = useState(null);


  const allPosts = async () => {
    const response = await axios.get(`http://localhost:5000/api/onduty`);
    setPosts(response.data.data);
    console.log("DataPosts", response.data);
  };

  useEffect(() => {
    allPosts();
  }, []);

  const handleImage = (e) => {
    setInfoImage(e.target.files[0]);
  };

  return (
    <div>
      <Nav />
      <ul>
        {posts.map((post) => (
          <img src={post.image} alt={post.image} />

        ))}
      </ul>
      {/* <Footer /> */}
    </div>
  );
};

export default Posts;
