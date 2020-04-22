const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get token from the header
  const token = req.header("x-auth-token"); //key to the token inside the header

  //Check if not token
  if (!token) {
    //401: unathorized
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token isn't valid" });
  }
};
