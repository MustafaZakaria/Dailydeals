import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import HttpError from '../middleware/errorMiddleware.js'

const router = express.Router()

// @description Fetch all products
// @route GET /api/products
// @access Public route 
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
}))

// @description Fetch single product
// @route GET /api/products/:id
// @access Public route
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  }
  else {
    const error = new HttpError('Product not found', 404)
    return next(error)
  }
}))

export default router