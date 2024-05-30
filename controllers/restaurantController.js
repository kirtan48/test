const restaurantModel = require("../models/restaurantModel");
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "Restaurant successfully created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      err,
    });
  }
};
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find({});
    if (!restaurant) {
      return res.status(500).send({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurant.length,
      restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create get allRestaurant API",
      err,
    });
  }
};
const getRestaurantController = async (req, res) => {
  try {
    const id = req.query.id;
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.status(500).send({
        success: false,
        message: "restaurant Not found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in  get Restaurant API",
      err,
    });
  }
};
const deleteRestaurantController=async (req,res)=>{
    try{

        const id=req.query.id;
        if(!id){
            return res.status(500).send({
                success:true,
                message:"Please provide id to be deleted"
            })
        }
        await restaurantModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Restaurat successfully deleted"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error in  delete restaurant api",
          err,
        });
      }
}
module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController
};
