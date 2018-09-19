const express = require("express");
const router = express.Router();

const LastTimeLogin = require("../../models/LastTimeLogin");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.post("/", (req, res) => {
  LastTimeLogin.findOne({ email: req.body.email }).then(lastLog => {
    return res.json({ time: lastLog.time });
  });
});

module.exports = router;
