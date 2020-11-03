function errorHandler(err, req, res, next) {
  const error = {};

  error.message = err.message || 'Internal error';
  error.statusCode = err.statusCode || 500;
  
  if(err.data) {
    error.data = err.data;
  }
  console.log(error)

  return res.status(error.statusCode).send(error);
}

module.exports = errorHandler;