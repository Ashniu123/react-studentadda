const express = require("express");
const multer = require("multer");
const verifyMiddleware = require("../utils/verifyMiddleware");

const router = express.Router();

router.all("/", (_req, res) => {
  res.json(responseMessage.SUCCESS.IT_WORKS);
});

// public routes
router.post("/login", require("./user/login"));
router.post("/register", require("./user/register"));

// private routes
// user routes
router.post("/user", verifyMiddleware, require("./user/update"));

// event routes
router.get("/events", verifyMiddleware, require("./event/getEvents"));
router.post("/events", verifyMiddleware, require("./event/addEvent"));
router.put("/events", verifyMiddleware, require("./event/updateEvent"));
router.delete("/events/:id", verifyMiddleware, require("./event/removeEvent"));

// sets routes
router.get("/sets", verifyMiddleware, require("./sets/getSets"));
router.post("/sets", verifyMiddleware, require("./sets/addSet"));
router.delete("/sets/:id", verifyMiddleware, require("./sets/removeSet"));

// notes routes
router.get("/sets/:id/:pageno", verifyMiddleware, require("./sets/getNote"));
router.post("/sets/:id", verifyMiddleware, require("./sets/addNote"));
router.delete("/sets/:id/:pageno", verifyMiddleware, require("./sets/removeNote"));

module.exports = router;
