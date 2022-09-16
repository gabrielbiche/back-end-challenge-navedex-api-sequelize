export const errorHandlingMiddleware = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ Message: error.message })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ Message: error.message })
  }

  const statusCode = error.statusCode ?? 500

  const message = error.statusCode ? error.message : error.message

  return res.status(statusCode).json({ message })
}
