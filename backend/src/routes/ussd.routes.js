const express = require("express");
const router = express.Router();
// NEW: Database-backed USSD handler (Phase 1 Migration)
const ussdHandler = require("../channels/ussd/handler");
// OLD: Keeping old controller as backup (do not delete)
// const ussdController = require('../controllers/ussd.controller');

// Africa's Talking USSD callback URL
router.post("/", ussdHandler.handleUSSD);

// Health check
router.get("/", (req, res) => {
  res.send("DialAI USSD Service is running.");
});

module.exports = router;
