export class BadRequest extends Error {
  constructor(message = BadRequest) {
    super(message)
    this.name = 'BadRequest'
    this.statusCode = 400
    this.errorCode = 400
  }
}
export class Unauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'Unauthorized'
    this.statusCode = 401
    this.errorCode = 401
  }
}
export class NotFound extends Error {
  constructor(message = 'The requested resource could not be found') {
    super(message)
    this.name = 'NotFound'
    this.statusCode = 404
    this.errorCode = 404
  }
}
