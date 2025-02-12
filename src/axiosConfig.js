import axios from "axios";

const instance = axios.create({
    baseURL: "https://bizversion-express.onrender.com",
});

export default instance;
