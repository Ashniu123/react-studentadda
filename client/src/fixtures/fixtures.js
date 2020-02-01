export default {
  SERVER_URI:
    process.env.NODE_ENV === "production" ? window.location.origin : "http://localhost:3002/api",
};
