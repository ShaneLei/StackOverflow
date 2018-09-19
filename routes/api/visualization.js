const express = require("express");
const router = express.Router();

const Interaction = require("../../models/Interaction");

// @route   Post api/stackoverflow/getScroll
// @desc    Get scroll interaction
// @access  Private
router.post("/getScroll", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      res.json(interactionLog);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/getMouseMove
// @desc    Get mouseMove interaction
// @access  Private
router.post("/getMouseMove", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      res.json(interactionLog);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/getAskClick
// @desc    Get askClick interaction
// @access  Private
router.post("/getAskClick", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      res.json(interactionLog);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/getNewestClick
// @desc    Get newestClick interaction
// @access  Private
router.post("/getNewestClick", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      res.json(interactionLog);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/getVotesClick
// @desc    Get votesClick interaction
// @access  Private
router.post("/getVotesClick", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      res.json(interactionLog);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
