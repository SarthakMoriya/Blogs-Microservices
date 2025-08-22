import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import axios from "axios";
import config from "./config.js"; // Import the config file
const app = express();
const router = express.Router();
const authRouter = express.Router();

app.use(express.json());
app.use(cors());
app.use('/blogs', router);
app.use('/auth', authRouter);

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const validToken = jwt.verify(token, config.JWT_SECRET);
    if (validToken) {
      next();
    } else {
      res.status(401).json({ message: "Expired session Please login again" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something went wrong",
      message: "Expired session Please login again",
    });
  }
};

authRouter.post('/login', async (req, res) => {
  try {
    let data = req.body;
    const response = await axios.post(`${config.AUTH_SERVICE_URL}/auth/login`, data);
    const { message, status, body } = response.data;
    console.log(response.data);
    res.status(200).json({ message, status, body });
  } catch (error) {
    console.log(Object.keys(error));
    res.status(404).json({ message: "AUTH SERVICE ERROR", status: "fail", body: {} });
  }
});

authRouter.post('/signup', async (req, res) => {
  try {
    let data = req.body;
    const response = await axios.post(`${config.AUTH_SERVICE_URL}/auth/signup`, data);
    const { message, status, body } = response.data;
    res.status(200).json({ message, status, body });
  } catch (error) {
    console.log(Object.keys(error));
    res.status(404).json({ message: "AUTH SERVICE ERROR", status: "fail", body: {} });
  }
});

router.post('/create', verifyToken, async (req, res) => {
  try {
    let data = req.body;
    const blog = await axios.post(`${config.CREATE_SERVICE_URL}/create/`, data);
    console.log(blog.data);
    const { message, status, body, error } = blog.data;
    res.status(200).json({ message, status, body, error });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "CREATE SERVICE ERROR", status: "fail", body: {} });
  }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const blog = await axios.delete(`${config.DELETE_SERVICE_URL}/delete/${req.params.id}`);
    const { message, status, body } = blog.data;
    res.status(200).json({ message, status, body });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "DELETE SERVICE ERROR", status: "fail", body: {} });
  }
});

router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    let data = req.body;
    const blog = await axios.put(`${config.UPDATE_SERVICE_URL}/update/${req.params.id}`, data);
    const { message, status, body } = blog.data;
    res.status(200).json({ message, status, body });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "UPDATE SERVICE ERROR", status: "fail", body: {} });
  }
});

router.get('/', async (req, res) => {
  try {
    const blog = await axios.get(`${config.GET_SERVICE_URL}/get/`);
    const { message, status, body } = blog.data;
    res.status(200).json({ message, status, body });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "GET SERVICE ERROR", status: "fail", body: {} });
  }
});

app.listen(3006, () => {
  console.log(`API GATEWAY listening on port: 3006 in ${config.NODE_ENV} mode`);
});