const express = require("express");
const router = express.Router();

const Interaction = require("../../models/Interaction");

// @route   Post api/stackoverflow/scroll
// @desc    Log scroll interaction
// @access  Private
router.post("/scroll", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      if (interactionLog) {
        const newInteraction = {
          date: new Date(),
          interactionType: "scroll"
        };
        interactionLog.interaction.push(newInteraction);
        interactionLog.save();
      } else {
        const newLog = new Interaction({
          email: req.body.email,
          interaction: [
            {
              date: new Date(),
              interactionType: "scroll"
            }
          ]
        });
        newLog.save();
      }
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/askClick
// @desc    Log askClick interaction
// @access  Private
router.post("/askClick", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      console.log(interactionLog);
      if (interactionLog) {
        const newInteraction = {
          date: new Date(),
          interactionType: "askClick"
        };
        interactionLog.interaction.push(newInteraction);
        interactionLog.save();
      } else {
        const newLog = new Interaction({
          email: req.body.email,
          interaction: [
            {
              date: new Date(),
              interactionType: "askClick"
            }
          ]
        });
        newLog
          .save()
          .then(log => console.log("log success"))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/mouseMove
// @desc    Log mouseMove interaction (left-right 1 time log once)
// @access  Private
router.post("/mouseMove", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      console.log(interactionLog);
      if (interactionLog) {
        const newInteraction = {
          date: new Date(),
          interactionType: "mouseMove"
        };
        interactionLog.interaction.push(newInteraction);
        interactionLog.save();
      } else {
        const newLog = new Interaction({
          email: req.body.email,
          interaction: [
            {
              date: new Date(),
              interactionType: "mouseMove"
            }
          ]
        });
        newLog
          .save()
          .then(log => console.log("log success"))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/newestClick
// @desc    Log newestClick interaction
// @access  Private
router.post("/newestClick", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      console.log(interactionLog);
      if (interactionLog) {
        const newInteraction = {
          date: new Date(),
          interactionType: "newestClick"
        };
        interactionLog.interaction.push(newInteraction);
        interactionLog.save();
      } else {
        const newLog = new Interaction({
          email: req.body.email,
          interaction: [
            {
              date: new Date(),
              interactionType: "newestClick"
            }
          ]
        });
        newLog
          .save()
          .then(log => console.log("log success"))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   Post api/stackoverflow/votesClick
// @desc    Log votesClick interaction
// @access  Private
router.post("/votesClick", (req, res) => {
  Interaction.findOne({ email: req.body.email })
    .then(interactionLog => {
      console.log(interactionLog);
      if (interactionLog) {
        const newInteraction = {
          date: new Date(),
          interactionType: "votesClick"
        };
        interactionLog.interaction.push(newInteraction);
        interactionLog.save();
      } else {
        const newLog = new Interaction({
          email: req.body.email,
          interaction: [
            {
              date: new Date(),
              interactionType: "votesClick"
            }
          ]
        });
        newLog
          .save()
          .then(log => console.log("log success"))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
