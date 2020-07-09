const express = require('express');
const router = express.Router();
const {login, isLoggedIn} = require('../controllers/auth');
const auth = require('../middlewhare/auth');



router
  .route('/')
  .get(auth, isLoggedIn)
  .post(login);

module.exports = router;