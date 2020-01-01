const handleCatchErrors = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  res.status(err.code || 500);
  res.json({ message: err.message || 'Unknown error occurred!' });
};

module.exports = handleCatchErrors;