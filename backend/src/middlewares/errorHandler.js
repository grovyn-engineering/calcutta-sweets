const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`[ERROR] ${req.method} ${req.originalUrl} → ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message || 'Internal Server Error',
  });
};

module.exports = { errorHandler };
