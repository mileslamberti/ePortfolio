import axios from "axios";

export default axios.create({
  //baseURL:
  //  "http://localhost:5000/tech-pirates-portfolio-web-app/us-central1/api",
  baseURL: `https://us-central1-tech-pirates-portfolio-web-app.cloudfunctions.net/api`,
});
