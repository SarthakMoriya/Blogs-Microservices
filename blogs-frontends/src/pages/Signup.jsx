import React, { useState } from "react";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup({ username, email, password });
      navigate("/login");
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Signup</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};
