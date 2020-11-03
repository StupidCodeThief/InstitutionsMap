class BadRequest {
  constructor(data, message = 'Validation error') {
    this.data = data;
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = BadRequest;