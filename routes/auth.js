const router = require('express').Router();
const User = require('../model/User');
const argon2i = require('argon2-ffi').argon2i;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
// Validation Tool
const validation = require('../validation');

router.post('/register', async (req, res) => {
  // Validate data
  const {
    error
  } = validation.registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check If User Exists In Database
  const usernameExist = await User.exists({
    username: req.body.username
  });
  if (usernameExist) {
    return res.status(400).send("Username is already in use")
  }
  const emailExist = await User.findOne({
    email: req.body.email
  });
  if (emailExist) {
    return res.status(400).send("Email is already in use")
  }

  // Hashes Password
  const salt = await crypto.randomBytes(64, (err, salt) => {
    if (err) throw err;
  });

  const hashedPassword = await argon2i.hash(req.body.password, salt).catch(err => {
    res.status(400).send("Server Side Error")
  })
  // Creates User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  // Attempts To Add User To DB
  try {
    const savedUser = await user.save()
    res.send({
      user: user._id
    })
  } catch (err) {
    res.status(400).send(err)
  };

})
// Login Router
router.post('/login', async (req, res) => {
  //Validate data
  const {
    error
  } = validation.loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check If User Exists In Database
  const user = await User.findOne({
    username: req.body.username
  });
  if (!user) {
    return res.status(400).send("Username RO Password is incorrect")
  }

  // Check If the Password Is Correct
  const validPassword = await argon2i.verify(user.password, req.body.password);
  console.log(validPassword)
  if (!validPassword) {
    return res.status(400).send("Username or Password is incorrect")
  }
  res.send("Correct")
})
module.exports = router;