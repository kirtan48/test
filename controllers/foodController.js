const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price) {
      return res.status(500).send({
        success: false,
        message: "please provide food title, description and Price",
        error,
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(200).send({
      success: true,
      message: "Food Created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Food Response",
      error,
    });
  }
};
const getAllFoodController = async (req, res) => {
  try {
    const food = await foodModel.find({});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      totalFood: food.length,
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get All FOod Response",
      error,
    });
  }
};
const updateFoodController = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please provide id to be updated",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    const updateFood = await foodModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );
    if (!updateFood) {
      return res.status(404).send({
        success: false,
        message: "No Foodfound",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Error in update inFood Api",
      error,
    });
  }
};
const deleteFoodController = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please entr Id",
      });
    }
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food Not found",
      });
    }
    await foodModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: false,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Delete APi",
      error,
    });
  }
};
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Place Order API",
      error,
    });
  }
};
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.query.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide oreder ID",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: false,
      message: "Order status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In order Status API",
      error,
    });
  }
};
module.exports = {
  createFoodController,
  getAllFoodController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
