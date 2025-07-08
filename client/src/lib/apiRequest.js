import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:5000/api",
    // baseURL: "https://realestate-react-js-b.onrender.com/api",
    withCredentials: true,
});

export default apiRequest;