const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../db");
const auth = require("../middleware/auth");
const { response } = require("express");

// @route   GET api/auth
// @desc    Get user object
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    let {
      rows: [user],
    } = await db.query(
      "SELECT id, user_name FROM users WHERE id = $1 LIMIT 1",
      [req.user.id]
    );

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("username", "Username is required ").exists(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // See if user exists
      const {
        rows: [user],
      } = await db.query(
        "SELECT id, password FROM users WHERE user_name = $1 LIMIT 1",
        [username]
      );

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE),
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

      await db.query("INSERT INTO tokens (refresh_token) VALUES ($1)", [
        refreshToken,
      ]);

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

router.post("/token", async (req, res) => {
  const {
    body: { refreshToken },
  } = req;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const {
      rows: [{ count: refreshTokenExists }],
    } = await db.query("SELECT COUNT(1) FROM tokens WHERE refresh_token = $1", [
      refreshToken,
    ]);

    if (!parseInt(refreshTokenExists)) {
      return res.sendStatus(401);
    }

    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE),
    });
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const {
      rowCount,
    } = await db.query("DELETE FROM tokens WHERE refresh_token = $1", [
      req.body.refreshToken,
    ]);

    if (rowCount === 0) {
      return res.sendStatus(401);
    }

    return res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post(
  "/updateCredentials",
  auth,
  [
    check("newUsername", "Username is required ").exists(),
    check("oldPassword", "Old password is required ").exists(),
    check("newPassword", "New password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newUsername, oldPassword, newPassword } = req.body;

    try {
      const {
        rows: [user],
      } = await db.query("SELECT password FROM users WHERE id = $1 LIMIT 1", [
        req.user.id,
      ]);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const _newPassword = await bcrypt.hash(newPassword, salt);

      const {
        rowCount,
      } = await db.query(
        "UPDATE users SET user_name = $1, password= $2 WHERE id = $3",
        [newUsername, _newPassword, req.user.id]
      );

      if (rowCount === 0) {
        throw "No row updated";
      }

      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

module.exports = router;
