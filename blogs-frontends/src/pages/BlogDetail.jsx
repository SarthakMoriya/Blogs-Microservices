import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../api/api";
import { getComments, createComment } from "../api/api";
import Comment from "../components/Comment";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getBlog(id)
      .then((res) => {
        console.log(res);
        setBlog(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    getComments(id)
      .then((res) => setComments(res.data))
      .catch(console.error);
  }, [id]);

  const handleComment = () => {
    createComment({ blogId: id, description: newComment })
      .then((res) => setComments((prev) => [...prev, res.data]))
      .catch(console.error);
    setNewComment("");
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{blog.name}</h1>
      <p>{blog.content}</p>

      <h3>Comments</h3>
      {comments.map((c) => (
        <Comment key={c._id} comment={c} />
      ))}

      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add comment"
      />
      <button onClick={handleComment}>Submit</button>
    </div>
  );
};

export default BlogDetail;
