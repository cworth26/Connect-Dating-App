const db = require("../database/models");
const axios = require("axios");
const { response } = require("express");
const User = require("../database/models/user");
const createConfirmation = require("./confirmationCode");
const mailer = require("../config/nodemailer.config");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByUsername: function (req, res) {
    db.User.findOne({ username: req.params.username })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    //ASK CALEB: USING _ID VS USERNAME
    db.User.findOneAndUpdate({ username: req.params.username }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.body.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel, "User successfully deleted!"))
      .catch((err) => res.status(422).json(err));
  },
  getFakepeople: function (req, res) {
    axios
      .get("https://randomuser.me/api/?nat=us&results=30")
      .then((response) => {
        console.log(response.data.results);
        res.json(response.data.results);
      });
  },
  createUser: function (req, res) {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      age,
      location,
      gender,
      pronouns,
      sexuality,
      status,
      bio,
      interests,
    } = req.body;

    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log("User Create Error: ", err);
        return;
      }

      if (user) {
        res.json({
          error: `There is already a user with the username: ${username}`,
        });
        return;
      }

      const newUser = new User({
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        age: age,
        location: location,
        gender: gender,
        pronouns: pronouns,
        sexuality: sexuality,
        status: status,
        bio: bio,
        interests: interests,
      });

      const confirmationCode = createConfirmation();

      try {
        mailer.sendConfirmationEmail(
          newUser.username,
          newUser.email,
          confirmationCode
        );
      } catch (err) {
        console.log("controllers mailer error");
        console.error(err);
      }

      //send confirmation email after a new user's creation

      newUser.save((err, savedUser) => {
        if (err) return res.json(err);

        res.json(savedUser);
      });
    });
  },
};
