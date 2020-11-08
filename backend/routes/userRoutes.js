import express from 'express'
import { userLogin, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, updateUserByAdmin, getUserById } from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import { check } from 'express-validator'

const router = express.Router()

router.get('/', protect, isAdmin, getUsers)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.post('/login', userLogin)

router.post('/signup', [
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({ min: 6 })
], registerUser)

router.delete('/:id', protect, isAdmin, deleteUser)
router.get('/:id', protect, isAdmin, getUserById)
router.put('/:id', protect, isAdmin, updateUserByAdmin)

export default router

