const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    const message = err.errors?.[0]?.message || "Invalid input";
    return res.status(400).json({ success: false, message });
  }
};

module.exports = { validate };
