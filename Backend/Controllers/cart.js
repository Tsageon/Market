const {db} = require("../Config/firebase"); 

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const userCartRef = db.collection('Carts').doc(userId);
    const userCartSnapshot = await userCartRef.get();

    let cartData = userCartSnapshot.exists ? userCartSnapshot.data() : {};

    if (cartData[productId]) {
      cartData[productId].quantity += quantity;
    } else {

      cartData[productId] = { productId, quantity };
    }

    await userCartRef.set(cartData);
    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userCartRef = db.collection('Carts').doc(userId);
    const userCartSnapshot = await userCartRef.get();

    if (!userCartSnapshot.exists) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }

    let cartData = userCartSnapshot.data();

    if (cartData[productId]) {
      delete cartData[productId];
    }

    await userCartRef.set(cartData);
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};


const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const userCartRef = db.collection('Carts').doc(userId);
    const userCartSnapshot = await userCartRef.get();

    if (!userCartSnapshot.exists) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }

    const cartData = userCartSnapshot.data();
    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
};


const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const userCartRef = db.collection('Carts').doc(userId);
    await userCartRef.delete();  
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing the cart', error: error.message });
  }
};

module.exports = { addToCart, removeFromCart, getCart, clearCart };
