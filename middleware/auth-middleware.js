const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const userInfo = jwt.verify(req.headers.bearer, process.env.SECRET_KEY);
    req.user = userInfo;
    next();
  } catch (err) {
    res.send({ msg: err.message });
  }
};
