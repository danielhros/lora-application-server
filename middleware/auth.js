const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
