import User from '../models/userModel.js'
import HttpError from '../models/http-error.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

//Email, Password Authentication @POST /api/users/login
// Public
const userLogin = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body

  let user

  try {
    user = await User.findOne({ email: email })
  }
  catch (err) {
    const error = new HttpError("Logging in failed, please try again", 500)
    return next(error)
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }
  else {
    const error = new HttpError("Invalid email or password, could not log you in", 401)
    return next(error)
  }
})

// Register a new user
// Public
const registerUser = asyncHandler(async (req, res, next) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check the required data", 422))
  }

  const { name, email, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ email: email })
  }
  catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500)
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError("User already exists, please login or signup with another email", 400)
    return next(error)
  }
  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }
  else {
    const error = new HttpError("Invalid user data", 500)
    return next(error)
  }
})

// Get user profile
// Private
const getUserProfile = asyncHandler(async (req, res, next) => {

  let user

  try {
    user = await User.findById(req.user._id)
  }
  catch (err) {
    const error = new HttpError('User not found', 404)
    return next(error)
  }
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  }
  else {
    const error = new HttpError('User not found', 404)
    return next(error)
  }
})


// Post update user profile
// Private
const updateUserProfile = asyncHandler(async (req, res, next) => {

  let user

  try {
    user = await User.findById(req.user._id)
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 404)
    return next(error)
  }
  if (user) {
    user.name = req.body.name || user.name,
      user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      name: updatedUser.name,
      _id: updatedUser.id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })

  }

  else {
    const error = new HttpError('User not found', 404)
    return next(error)
  }
})

// Get all users
// Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {

  let users

  try {
    users = await User.find({}) //all users
    res.json(users)
  }
  catch {
    const error = new HttpError('User not found', 404)
    return next(error)
  }

})

// Delete user by an id
// Private admin
const deleteUser = asyncHandler(async (req, res, next) => {

  let user

  try {
    user = await User.findById(req.params.id)
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 404)
    return next(error)
  }
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  }
  else {
    const err = new HttpError('User not found', 404)
    return next(err)
  }

})

// Get userById
// Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {

  let user

  try {
    user = await User.findById(req.params.id).select('-password')

    if (user) {
      res.json(user)
    }
    else {
      const error = new HttpError('User not found', 404)
      return next(error)
    }
  }
  catch (err) {
    const error = new HttpError('User not found', 404)
    return next(error)
  }

})

// Post update user by Admin
// Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res, next) => {

  let user

  try {
    user = await User.findById(req.params.id)
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 404)
    return next(error)
  }
  if (user) {
    user.name = req.body.name || user.name,
      user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin



    const updatedUser = await user.save()

    res.json({
      name: updatedUser.name,
      _id: updatedUser.id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  }

  else {
    const error = new HttpError('User not found', 404)
    return next(error)
  }
})



export { userLogin, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUserByAdmin }
