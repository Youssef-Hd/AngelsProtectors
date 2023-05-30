import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState(""); // Added state for comment input
  const [replyText, setReplyText] = useState(""); // Added state for reply input
  const [showReplyInput, setShowReplyInput] = useState({});

  const allPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/location");
      const postsData = response.data.data;

      const postsWithComments = await Promise.all(
        postsData.map(async (post) => {
          const commentsResponse = await axios.get(
            `http://localhost:5000/api/comment/${post._id}`
          );
          const commentsData = commentsResponse.data;

          const commentsWithReplies = await Promise.all(
            commentsData.map(async (comment) => {
              const repliesResponse = await axios.get(
                `http://localhost:5000/api/reply/${comment._id}/replies`
              );
              const repliesData = repliesResponse.data;
              // NEW CODE: Mapping over repliesData
              const repliesWithMappedData = repliesData.map((reply) => {
                const { content } = reply;
                return { content };
              });
              // END OF NEW CODE
              return {
                ...comment,
                replies: repliesWithMappedData,
              };
            })
          );

          return {
            ...post,
            comments: commentsWithReplies,
          };
        })
      );

      setPosts(postsWithComments);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    allPosts();
  }, []);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/comment", {
        postId,
        content: commentText,
      });
      console.log("Comment posted:", response.data);
      allPosts();
      setCommentText(""); // Clear comment input after submitting
    } catch (error) {
      console.log("Error posting comment:", error);
    }
  };
  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = async (commentId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reply/postreply",
        {
          commentId,
          content: replyText,
        }
      );
      console.log("Reply posted:", response.data);
      allPosts();
      setReplyText("");
      }
    catch (error) {
      console.log("Error posting reply:", error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="Posts-div">
        {posts.map((post) => (
          <div className="div-2" key={post._id}>
        
          <h1>{post.user.name}</h1>
            <img
              className="image-posts"
              src={post.images[0].url}
              alt={post.image}
            />
            <p className="description-posts">
              {showFullDescription
                ? post.description
                : truncateDescription(post.description, 10)}
              {post.description.split(" ").length > 10 && (
                <button className="see-more-button" onClick={toggleDescription}>
                  {showFullDescription ? "See Less" : "See More"}
                </button>
              )}
            </p>
            <div>
              {post.comments.map((comment) => (
                <div key={comment._id}>
                  <p className="Comment-section-p">{comment.content}</p>
                  <div className="Comment-reply-container">
                    {comment.replies.map((reply) => (
                      <p className="Reply-section-p" key={reply._id}>
                        {reply.content}
                      </p>
                    ))}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="Reply-input" // Updated line: Reply-input
                      value={replyText}
                      onChange={(event) =>
                        handleReplyChange(event, comment._id)
                      }
                    />
                    <button
                      className="Post-reply-button" // Updated line:
                      onClick={() => handleReplySubmit(comment._id)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                className="Comment-input"
                value={commentText}
                onChange={handleCommentChange}
              />
              <button
                className="Post-comment-button"
                onClick={() => handleCommentSubmit(post._id)}
              >
                Post Comment
              </button>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Posts;
