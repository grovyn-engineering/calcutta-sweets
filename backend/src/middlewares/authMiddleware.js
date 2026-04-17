const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.admin = decoded;
    next();
  } catch (error) {
    console.error(`JWT Verification Error: ${error.message}`);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

module.exports = { protect };