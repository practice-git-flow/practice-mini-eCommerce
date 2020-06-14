const router = require('express').Router()
const UserRoute = require('./UserRoute')
const ProductRoute = require('./ProductRoute')

router.use('/users', UserRoute)
router.use('/products', ProductRoute)

module.exports = router