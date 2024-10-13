import userModel from "../models/userModel.js";

// Add Product to User Cart
const addProductToCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    console.log("Received data:", { userId, itemId, size, quantity });

    const userData = await userModel.findById(userId);
    console.log("User data before update:", userData);

    let cartData = userData.cartData || {};
    console.log("Initial cart data:", cartData);

    // Update logic for adding product
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    cartData[itemId][size] += quantity; // Increment quantity

    console.log("Updated cart data:", cartData);

    // Use $set to update cart data correctly
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found or update failed");
      return res
        .status(404)
        .json({ message: "User not found or update failed", success: false });
    }

    res.status(200).json({
      message: "Product added to cart",
      success: true,
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Error in addProductToCart:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Update User Cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Log incoming data
    console.log("Update cart request:", { userId, itemId, size, quantity });

    // Find the user and update in one operation
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId, [`cartData.${itemId}`]: { $exists: true } },
      { $set: { [`cartData.${itemId}.${size}`]: quantity } },
      { new: true }
    );

    console.log("Updated user:", updatedUser);

    if (!updatedUser) {
      console.log("User not found or item not in cart");
      return res.status(404).json({
        success: false,
        message: "User not found or item not in cart",
      });
    }

    res
      .status(200)
      .json({ message: "Cart Updated Successfully", success: true });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user card data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.status(200).json({
      cartData: userData.cartData,
      success: true,
      message: "Cart Data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, succes: false });
  }
};

const mergeCarts = async (req, res) => {
  try {
    const { userId } = req.body; // This should be added by your auth middleware
    const { guestCart } = req.body;

    // Fetch the user's existing cart
    const user = await userModel.findById(userId);
    let userCart = user.cartData || {};

    // Merge the guest cart into the user's cart
    for (const [itemId, sizes] of Object.entries(guestCart)) {
      if (!userCart[itemId]) {
        userCart[itemId] = {};
      }
      for (const [size, quantity] of Object.entries(sizes)) {
        if (!userCart[itemId][size]) {
          userCart[itemId][size] = 0;
        }
        userCart[itemId][size] += quantity;
      }
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(userId, { cartData: userCart });

    res.status(200).json({
      success: true,
      message: "Carts merged successfully",
      cartData: userCart,
    });
  } catch (error) {
    console.error("Error merging carts:", error);
    res.status(500).json({ success: false, message: "Failed to merge carts" });
  }
};

export { addProductToCart, updateCart, getUserCart, mergeCarts };
