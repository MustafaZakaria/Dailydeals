import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import HttpError from '../models/http-error.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    }
    catch (error) {
      const err = new HttpError('Token failed, please try again later', 401)
      return next(err)
    }
  }

  if (!token) {
    const error = new HttpError('Not authorized', 401)
    return next(error)
  }

})

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  }
  else {
    const error = new HttpError('Not authorized as an admin', 401)
    return next(error)
  }
}

export { protect, isAdmin }