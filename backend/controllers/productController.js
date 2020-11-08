import Product from '../models/productModel.js'
import HttpError from '../models/http-error.js'
import asyncHandler from 'express-async-handler'

// Get all products
// Public
const getProducts = asyncHandler(async (req, res, next) => {
  let products
  try {
    products = await Product.find({})
    res.json(products)
  }
  catch (err) {
    const error = new HttpError("Something went wrong, couldn't find the products", 500)
    return next(error)
  }
})

// Get product by id
// Public
const getProductById = asyncHandler(async (req, res, next) => {

  const productId = req.params.id
  let product
  try {
    product = await Product.findById(productId)
  }
  catch (err) {
    const error = new HttpError("Something went wrong, could not find the product", 500)
    return next(error)
  }

  if (product) {
    res.json(product)
  }
  else {
    const error = new HttpError('Product not found', 404)
    return next(error)
  }
})

// Delete a product by id
// Private/Admin
const deleteProductById = asyncHandler(async (req, res, next) => {
  let product

  try {
    product = await Product.findById(req.params.id)
  }
  catch (err) {
    const error = new HttpError("Something went wrong, couldn't find the product", 500)
    return next(error)
  }

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  }
  else {
    const error = new HttpError("Something went wrong, couldn't find the product", 500)
    return next(error)
  }

})

// Post Create a product
// Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })

  let createdProduct
  try {
    createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }
  catch (err) {
    const error = new HttpError("Something went wrong, couldn't create the product", 500)
    return next(error)
  }

})

// Put Update a product
// Private/Admin
const updateProductById = asyncHandler(async (req, res, next) => {

  const { name, price, description, image, brand, category, countInStock } = req.body

  let product
  try {
    product = await Product.findById(req.params.id)
  }
  catch (err) {
    const error = new HttpError("Something went wrong, couldn't update the product", 500)
    return next(error)
  }

  let updatedProduct

  if (product) {
    try {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      updatedProduct = await product.save()
      res.json(updatedProduct)
    }
    catch (err) {
      const error = new HttpError("Something went wrong, couldn't create the product", 500)
      return next(error)
    }
  }
  else {
    const error = new HttpError("Product not found", 500)
    return next(error)
  }

})
export { getProducts, getProductById, deleteProductById, createProduct, updateProductById }