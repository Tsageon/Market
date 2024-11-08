const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart, clearCart } = require('../Controllers/cart');


router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.get('/:userId', getCart);
router.post('/clear', clearCart);

module.exports = router;
