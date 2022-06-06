import axios from "axios";

const BackendClient = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-type": "application/json"
  }
});

export default BackendClient;