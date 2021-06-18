const express = require("express");
const router = express.Router();
const User = require("../../database/models/User");
const passport = require("../../passport");
const usersController = require("../../controllers/users");

router.post("/", usersController.createUser);
router.get("/", usersController.findAll);
router.get("/:username", usersController.findByUsername),

router.post(
  "/login",
  (req, res, next) => {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("LOGGED IN", req.user);
    res.send({
      username: req.user.username,
    });
  }
);

router.get("/", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.status(200).json({ msg: "LOGGED OUT" });
  } else {
    res.status(404).json({ msg: "NO USER TO LOGOUT" });
  }
});

router.get("/fakepeople", usersController.getFakepeople);

module.exports = router;
