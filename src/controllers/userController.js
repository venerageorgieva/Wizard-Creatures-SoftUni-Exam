const router = require("express").Router();
const userService = require("../services/userService.js");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;

  await userService.register({
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
  });

  res.redirect("/users/login");
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.login(email, password);

  res.cookie("token", token, { httpOnly: true });
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
