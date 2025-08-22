import React from "react";

const Comment = ({ comment }) => (
  <div style={{ borderTop: "1px solid #eee", padding: "0.5rem 0" }}>
    <b>{comment.userId}</b>: {comment.description}
  </div>
);

export default Comment;
