class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequest'
    this.statusCode = 400
    this.errorCode = 400
  }
}
class Unauthorized extends Error {
  constructor(message = 'Incorrect username or password') {
    super(message)
    this.name = 'Unauthorized'
    this.statusCode = 401
    this.errorCode = 401
  }
}
class NotFound extends Error {
  constructor(message = 'The requested resource could not be found') {
    super(message)
    this.name = 'NotFound'
    this.statusCode = 404
    this.errorCode = 404
  }
}

module.exports = {
  BadRequest: BadRequest,
  Unauthorized: Unauthorized,
  NotFound: NotFound
}
