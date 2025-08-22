import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import { Login } from "./pages/Login";
import { Signup} from "./pages/Signup";
import Navbar from "./components/Navbar";
import BlogCreateForm from "./pages/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<BlogCreateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
