const express = require("express");
const router = express.Router();
const {authenticateUser,authorizeRoles} = require("../Middleware/authMiddleware");


router.get(
  "/admin-dashboard",authenticateUser,authorizeRoles("Admin"),
  (req, res) => {
    res.json({ message: "Welcome to the Admin-dashboard" });
  }
);

module.exports = router;
