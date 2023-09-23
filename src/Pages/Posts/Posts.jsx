import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { format } from "date-fns";
import { CgProfile } from "react-icons/cg";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import "./Posts.css";

const Posts = () => {
  const [showFullDescription, setShowFullDescription] = useState({});
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({ comment: "" }); // Added state for comment input
  const [replyText, setReplyText] = useState(""); // Added state for reply input
  const [showReplyInput, setShowReplyInput] = useState({});
  const [showComments, setShowComments] = useState({});
  const [showAllComments, setShowAllComments] = useState({}); // New state for showing all comments
  const [showReplies, setShowReplies] = useState({}); // New state for showing all replies
  const [loading, setLoading] = useState(true);

  const allPosts = async () => {
    try {
      const response = await axios.get(
        "https://angelsprotectorss.onrender.com/api/location"
      );
      const postsData = response.data.data;
      setLoading(false); // Set loading to false after posts are fetched

      const postsWithComments = await Promise.all(
        postsData.map(async (post) => {
          const commentsResponse = await axios.get(
            `https://angelsprotectorss.onrender.com/api/comment/${post._id}`
          );
          const commentsData = commentsResponse.data;

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

  const truncateDescription = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentText((prevCommentText) => ({
      ...prevCommentText,
      [name]: value,
    }));
  };
  const storedId = sessionStorage.getItem("id");

  const handleCommentSubmit = async (e, postId) => {
    if (storedId && commentText.comment.trim() !== "") {
      try {
        await axios.post("https://angelsprotectorss.onrender.com/api/comment", {
          postId,
          content: commentText.comment,
          user: storedId,
        });
        allPosts();
        setShowComments({ ...showComments, [postId]: true }); // Initialize visibility for the new comment
        setCommentText(""); // Clear comment input after submitting
        toast.success("success");
      } catch (error) {
        toast.error("Error posting comment:", error);
      }
    } else {
      toast.error(
        "Make sure you are logged in and that the comment field is valid"
      );
    }
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = async (commentId) => {
    if (storedId && replyText.trim() !== "") {
      try {
        const response = await axios.post(
          "https://angelsprotectorss.onrender.com/api/reply/postreply",
          {
            commentId,
            content: replyText,
            user: storedId,
          }
        );
        allPosts();
        setReplyText("");
        toast.success("success");
        setShowReplyInput({ ...showReplyInput, [commentId]: false }); // Hide reply input after submitting
      } catch (error) {
        console.log("Error posting reply:", error);
      }
    } else
      toast.error(
        "Make sure you are logged in and that the reply field is valid"
      );
  };
  const toggleComments = (postId) => {
    setShowAllComments({
      ...showAllComments,
      [postId]: !showAllComments[postId],
    });
  };
  const toggleDescription = (postId) => {
    setShowFullDescription({
      ...showFullDescription,
      [postId]: !showFullDescription[postId],
    });
  };

  const toggleReplies = (commentId) => {
    setShowReplies({ ...showReplies, [commentId]: !showReplies[commentId] });
  };
  return (
    <>
      <div className="papito-div">
        <Nav />
        <div className="Posts-div">
          <h1 className="h1-angels">Angels Protector</h1>
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
                  {showFullDescription[post._id]
                    ? post.description
                    : truncateDescription(post.description, 10)}
                  {post.description.split(" ").length > 10 && (
                    <button
                      className="see-more-button"
                      onClick={() => toggleDescription(post._id)}
                    >
                      {showFullDescription[post._id] ? "See Less" : "See More"}
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
                    {showAllComments[post._id]
                      ? "Hide Comments"
                      : "Display Comments"}
                    {showAllComments[post._id] ? (
                      <BsArrowUpCircleFill
                        className="icon-arrow-down"
                        size={30}
                      />
                    ) : (
                      <BsArrowDownCircleFill
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
                      !showAllComments[post._id] && index >= 1
                        ? "hidden-comment"
                        : ""
                    }`}
                    key={comment._id}
                  >
                    <label className="comment-user-name">
                      <CgProfile className="icon-profile-comment" size={25} />
                      {comment.user.name}
                    </label>
                    <p className="Comment-section-p">{comment.content}</p>
                    {showReplyInput[comment._id] && (
                      <div className="div-post-btn">
                        <textarea //this div contains reply value and the submit button of the reply
                          type="text"
                          placeholder="Enter New Reply"
                          className="Reply-input"
                          value={replyText} //reply value
                          onChange={(event) =>
                            handleReplyChange(event, comment._id)
                          }
                        />
                        <button
                          className="Post-reply-button"
                          onClick={() => handleReplySubmit(comment._id)} //reply submit action button
                        >
                          Post
                        </button>
                      </div>
                    )}
                    <button
                      className={`Show-reply-button ${
                        showReplyInput[comment._id] ? "hide-reply-button" : ""
                      }`}
                      onClick={() =>
                        //this button toggles the show, hide text area for posting the reply
                        setShowReplyInput({
                          ...showReplyInput,
                          [comment._id]: !showReplyInput[comment._id],
                        })
                      }
                    >
                      {showReplyInput[comment._id] ? "Hide" : "Reply"}
                    </button>

                    {comment.replies.length > 0 && (
                      <div className="Comment-reply-container">
                        <button
                          className="show-replies"
                          onClick={() => toggleReplies(comment._id)}
                        >
                          {showReplies[comment._id] ? "Hide" : "Replies"}

                          {showReplies[comment._id] ? (
                            <RiArrowDropUpLine className="icon_replies-dropdown" />
                          ) : (
                            <RiArrowDropDownLine
                              className="icon_replies-dropdown"
                              size={20}
                            />
                          )}
                        </button>

                        {comment.replies.map((reply, index) => (
                          <div
                            className={` ${
                              !showReplies[comment._id] ? "hidden-reply" : ""
                            }`}
                            key={reply._id}
                          >
                            <label className="user_reply">
                              <CgProfile className="icon-profile" size={20} />
                              {reply.user.name}
                            </label>
                            <p className="reply-section-p">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="div-comment-posts">
                <textarea
                  type="text"
                  name="comment"
                  placeholder="Comment Here"
                  className="Comment-input"
                  value={commentText.comment}
                  onChange={handleCommentChange}
                />
                <button
                  className="post-comment-button"
                  onClick={(e) => handleCommentSubmit(e, post._id)}
                >
                  Post
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Posts;
