const router = require("express").Router();
const Conversation = require("../models/Conversations");

//create a new conversation
router.post("/", async (req, res) => {
  try {
    const savedConversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conversation of the user based on the user id
//If the user is a part of 2 or more conversations then we return all the conversations that the user is part of
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation of the users that include two user ids
router.get("/find/:userId/:receiverId", async (req, res) => {
  try {
    console.log("The endpoint is reached");
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.userId, req.params.receiverId] },
    });
    console.log(conversation);
    console.log("The above statement is for the conversations");
    if (!conversation) {
      res.status(203).send("The conversation is not found");
    } else {
      res.status(200).json(conversation);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error is detected");
  }
});

module.exports = router;
