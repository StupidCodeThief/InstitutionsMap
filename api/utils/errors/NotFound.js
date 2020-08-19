class NotFound {
  constructor(message = 'Not Found') {
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = NotFound;