const express = require("express");
const router = express.Router();
const { Match, User } = require("../../database/models/");

let listofMatches = []

router.get("/all", async (req, res) => {
  try {
    const matchData = await Match.find({
        "users.userId": req.user._id,
        "users.match": {
          $ne: false
        }
    }).populate("users.userId");

    res.json(matchData);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get("/all/modified", async (req, res) => {
  try {
    const matchData = await Match.find({
        "users.userId": req.user._id,
        "users.match": {
          $ne: false
        }
    }).populate("users.userId");


    const newData = matchData.map(match => {
      const otherUser = match.users.filter(user => !user.userId.equals(req.user._id))
      console.log(otherUser);
      const matchUser = otherUser[0].userId;
      return {
        firstName: matchUser.firstName,
        lastName: matchUser.lastName,
        age: matchUser.age,
        pronouns: matchUser.pronouns,
        location: matchUser.location,
        interests: matchUser.interests,
        profileImg: matchUser.profileImg,
        username: matchUser.username
      }
    })


    res.json(newData);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.put('/msg/:matchId', async (req, res) => {
  const updatedMatchData = await Match.updateOne(
    {
      _id: req.params.matchId,
    },
    {
      $push: {
        messages: req.body,
      },
    }
  );
  
  return res.json(updatedMatchData);

})

router.post("/", async (req, res) => {
  try {

    if(req.body.usersArr[1].match) {
      const userData = await User.findByIdAndUpdate(req.user._id, {
        $push: {
          yes: req.body.usersArr[0].userId
        }
      })
    }


    // TODO: if allready exists don't create
    // find one match where one user.userId is equal to req.user._id
    // and one user.userId is equal to given userId
    const matchData = await Match.findOne({
      $and: [
        {
          "users.userId": req.user._id,
        },
        {
          "users.userId": req.body.usersArr[0].userId
        }
      ]
    });

    console.log(matchData)
    // ? need to update the user match value
    if (matchData) {
      const updatedMatchData = await Match.updateOne(
        {
          _id: matchData._id,
          "users.userId": req.user._id,
        },
        {
          $set: {
            "users.$.match": req.body.usersArr[1].match,
          },
        }
      );
        console.log("Match UPdated")
      return res.json(updatedMatchData);
    }

    const newMatch = new Match({
      users: req.body.usersArr,
      socketRoomName:
        req.body.usersArr[0].userId + "-" + req.body.usersArr[1].userId,
    });

    newMatch.save((err, savedMatch) => {
      if (err) return res.json(err);
      console.log("saved New Match", savedMatch);
      res.json(savedMatch);
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
