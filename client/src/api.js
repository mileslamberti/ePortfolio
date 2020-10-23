import axios from "axios";

export default axios.create({
  baseURL: `https://us-central1-tech-pirates-portfolio-web-app.cloudfunctions.net/api`,
});
