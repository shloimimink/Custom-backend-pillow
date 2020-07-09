const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async(req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // adding a new user
    user = new User({
      name,
      email,
      password,
    });

    // bcrypting the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // saving to mongoDB
    await user.save();

    // user's information
    const payload = {
      user: {
        id: user.id,
      },
    };
    // creates user's token
    jwt.sign(
      payload,
      "secret",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
