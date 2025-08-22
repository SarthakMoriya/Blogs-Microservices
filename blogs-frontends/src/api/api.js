import axios from "axios";


const API_URL = "http://blogs.com"; // test URL

export const signup = (user) => axios.post(`${API_URL}/auth/signup`, user);
export const login = (user) => axios.post(`${API_URL}/auth/login`, user);

export const getBlogs = () => axios.get(`${API_URL}/blogs`);
export const getBlog = (id) => axios.get(`${API_URL}/blogs/${id}`);
export const createBlog = (blog) => axios.post(`${API_URL}/create`, blog);
export const updateBlog = (id, blog) => axios.put(`${API_URL}/blogs/${id}`, blog);
export const deleteBlog = (id) => axios.delete(`${API_URL}/blogs/${id}`);


export const getComments = (blogId) => axios.get(`${API_URL}/${blogId}`);
export const createComment = (comment) => axios.post(API_URL, comment);