import axios from "axios";

const api = axios.create({
  baseURL: "https://apigateway.microservices.appf4s.io.vn/services/msuser/api",
});

export default api;
