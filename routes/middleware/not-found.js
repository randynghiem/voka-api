const handleNotFound = (req, res, next) => {
  const error = new Error("No implementation on this route");
  error.code = 404;
  throw error;
};

module.exports = handleNotFound;