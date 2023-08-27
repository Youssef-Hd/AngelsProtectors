import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { format } from "date-fns";
import { CgProfile } from "react-icons/cg";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import "./Posts.css";

const Posts = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState(""); // Added state for comment input
  const [replyText, setReplyText] = useState(""); // Added state for reply input
  const [showReplyInput, setShowReplyInput] = useState({});
  const [showComments, setShowComments] = useState({});
  const [showAllComments, setShowAllComments] = useState(true); // New state for showing all comments
  const [loading, setLoading] = useState(true);

  const allPosts = async () => {
    try {
      const response = await axios.get(
        "https://angelsprotectorss.onrender.com/api/location"
      );
      const postsData = response.data.data;
      setLoading(false); // Set loading to false after posts are fetched

      console.log("responseeee", response);

      const postsWithComments = await Promise.all(
        postsData.map(async (post) => {
          const commentsResponse = await axios.get(
            `https://angelsprotectorss.onrender.com/api/comment/${post._id}`
          );
          const commentsData = commentsResponse.data;
          console.log("commentsssdata", commentsData);

          const commentsWithReplies = await Promise.all(
            commentsData.map(async (comment) => {
              const repliesResponse = await axios.get(
                `https://angelsprotectorss.onrender.com/api/reply/${comment._id}/replies`
              );
              const repliesData = repliesResponse.data;

              // NEW CODE: Mapping over repliesData
              const repliesWithMappedData = repliesData.map((reply) => {
                const { content, user } = reply;
                return { content, user };
              });

              return {
                ...comment,
                // user: userData.name,
                replies: await Promise.all(repliesWithMappedData),
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
  const storedId = sessionStorage.getItem("id");

  const handleCommentSubmit = async (postId) => {
    if (storedId) {
      try {
        const response = await axios.post(
          "https://angelsprotectorss.onrender.com/api/comment",
          {
            postId,
            content: commentText,
            user: storedId,
          }
        );
        console.log("Comment posted:", response.data);
        allPosts();
        setShowComments({ ...showComments, [postId]: true }); // Initialize visibility for the new comment
        setCommentText(""); // Clear comment input after submitting
      } catch (error) {
        console.log("Error posting comment:", error);
      }
    } else {
      alert("please login ");
    }
  };
  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = async (commentId) => {
    if (storedId) {
      try {
        const response = await axios.post(
          "https://angelsprotectorss.onrender.com/api/reply/postreply",
          {
            commentId,
            content: replyText,
            user: storedId,
          }
        );
        console.log("Reply posted:", response.data);
        allPosts();
        setReplyText("");
        setShowReplyInput({ ...showReplyInput, [commentId]: false }); // Hide reply input after submitting
      } catch (error) {
        console.log("Error posting reply:", error);
      }
    } else alert("Please Login First");
    console.log("comments??", posts);
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="papito-div">
      <Nav />
      <div className="Posts-div">
        {/* <h1 className="h1-angels">Angels Protector</h1> */}
        {posts.map((post) => (
          <div className="div-2" key={post._id}>
            <div className="image-wrapper">
              <label className="label-posts">
                <CgProfile className="icon-profile" size={25} />
                {post.user.name}
              </label>
              {loading ? (
                <div className="loader-posts">
                  <BeatLoader color="#dbca72" loading={true} size={15} />
                </div>
              ) : (
                <img
                  className="image-posts"
                  src={post.images[0].url}
                  alt={post.image}
                  onLoad={() => setLoading(false)}
                />
              )}
              <div className="description-posts">
                {showFullDescription
                  ? post.description
                  : truncateDescription(post.description, 10)}
                {post.description.split(" ").length > 10 && (
                  <button
                    className="see-more-button"
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? "See Less" : "See More"}
                  </button>
                )}
              </div>

              <span className="date-stamp">
                Posted On {format(new Date(post.timestamp), "yyyy-MM-dd")}
              </span>

              {post.comments.length > 0 && (
                <h3
                  className="comments-word"
                  onClick={() => toggleComments(post._id)}
                >
                  Display All Comments
                  {showAllComments ? (
                    <BsArrowDownCircleFill
                      className="icon-arrow-down"
                      size={20}
                    />
                  ) : (
                    <BsArrowUpCircleFill
                      className="icon-arrow-down"
                      size={30}
                    />
                  )}
                </h3>
              )}
            </div>

            <div className="comment-content-div">
              {post.comments.map((comment, index) => (
                <div
                  className={`comment-name-div-posts ${
                    !showAllComments && index >= 1 ? "hidden-comment" : ""
                  }`}
                  key={comment._id}
                >
                  <label className="comment-user-name">
                    <CgProfile className="icon-profile-comment" size={25} />
                    {comment.user.name}
                  </label>
                  <p className="Comment-section-p">{comment.content}</p>
                  <div className="Comment-reply-container">
                    {comment.replies.map((reply) => (
                      <p className="Reply-section-p" key={reply._id}>
                        {reply.content}

                        {reply.name}
                      </p>
                    ))}
                  </div>
                  {showReplyInput[comment._id] && (
                    <div className="div-post-btn">
                      <textarea
                        type="text"
                        placeholder="Enter New Reply"
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
                  )}
                  <button
                    className={`Show-reply-button ${
                      showReplyInput[comment._id] ? "hide-reply-button" : ""
                    }`}
                    onClick={() =>
                      setShowReplyInput({
                        ...showReplyInput,
                        [comment._id]: !showReplyInput[comment._id],
                      })
                    }
                  >
                    {showReplyInput[comment._id] ? "Hide" : "Reply"}
                  </button>
                </div>
              ))}
            </div>
          
        <div className="div-comment-posts">
              <textarea
                type="text"
                placeholder="Comment Here"
                className="Comment-input"
                value={commentText}
                onChange={handleCommentChange}
              />
              <button
                className="Post-comment-button"
                onClick={() => handleCommentSubmit(post._id)}
              >
                Post
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
