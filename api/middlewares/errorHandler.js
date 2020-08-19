function errorHandler(err, req, res, next) {
  const error = {};

  error.message = err.message || 'Internal error';
  error.statusCode = err.statusCode || 500;
  
  if(err.data) {
    error.data = err.data;
  }

  return res.status(error.statusCode).json(error);
}

module.exports = errorHandler;