const passport = require("passport");
const { loginGoogle } = require("../controllers/authController");

const router = require("express").Router();

/* /login/google */
router
  .get("/login/google", passport.authenticate("google"))
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/users/login" }),
    loginGoogle
  );

module.exports = router;