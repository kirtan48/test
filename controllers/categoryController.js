const categoryModel = require("../models/categoryModel");
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide cateogry title",
        error,
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "category Created",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Create Category Response",
      error,
    });
  }
};
const getAllCatController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: category.length,
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get All Category Response",
      error,
    });
  }
};
const updateCatController=async(req,res)=>{
    try{
        const id=req.query.id;
        if(!id){
            return res.status(404).send({
                success:false,
                message:'please provide id to be updated'
            })
        }
        const {title ,imageUrl}=req.body
        const updateCategory=await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
        if(!updateCategory){
            return res.status(404).send({
                success:false,
                message:"No category found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Category Updated successfully"
        })


    }
    catch(error){
        res.status(500).send({
            sucess:false,
            message:"Error in update in Cat Api",
            error
        })
    }
}
const deleteCatController =async(req,res)=>{
  try{
    const id=req.query.id;
    if(!id){
      return res.status(500).send({
        success:false,
        message:"Please entr Id"
      })
    }
    const category=await categoryModel.findById(id);
    if(!category){
      return res.status(404).send({
        success:false,
        message:"Category Not found"
      })
    }
    await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success:false,
      message:"Category deleted successfully"
    })


  }
  catch(error){
    res.status(500).send({
      success:false,
      message:"Error in Category Delete APi",
      error
    })
  }

}
module.exports = { createCatController, getAllCatController ,updateCatController,deleteCatController};
