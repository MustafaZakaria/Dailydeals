import express from 'express'
import { getProducts, getProductById, deleteProductById, createProduct, updateProductById } from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.delete('/:id', protect, isAdmin, deleteProductById)
router.post('/', protect, isAdmin, createProduct)
router.put('/:id', protect, isAdmin, updateProductById)

export default router

