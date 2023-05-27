import React, { useState, useEffect } from "react";
import axios from "axios";
import './Comments.css'

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const createComment = async () => {
    try {
      const response = await axios.post("/api/comments", {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const createReply = async (commentId) => {
    try {
      const response = await axios.post(`/api/comments/${commentId}/replies`, {
        content: newReply,
      });
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          comment.replies.push(response.data);
        }
        return comment;
      });
      setComments(updatedComments);
      setNewReply("");
      setReplyingTo("");
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  return (
    <div>
      {/* <h2>Comments</h2> */}
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {comment.content}
            <ul>
              {comment.replies.map((reply) => (
                <li key={reply._id}>{reply.content}</li>
              ))}
              {replyingTo === comment._id && (
                <div>
                  <textarea
                    className="reply-text"
                    type="text"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <button onClick={() => createReply(comment._id)}>
                    Submit Reply
                  </button>
                </div>
              )}
              <button onClick={() => setReplyingTo(comment._id)}>Reply</button>
            </ul>
          </li>
        ))}
      </ul>
      <div className="comment-div">
      <textarea
        className="comment-text"
        placeholder="Enter Your Comment Here"
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button className="btn-comment" onClick={createComment}>Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
