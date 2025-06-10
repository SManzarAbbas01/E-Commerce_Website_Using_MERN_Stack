import mongoose from "mongoose";
const productSchema =new mongoose.Schema(
    {
        name:{type :String, required: true},
        description:{type :String, required: true},
        price:{type : Number, required: true},
        Image:{type :Array, required: true},
        category :{type : String, required: true},
        subCategory:{type : String, required: true},
        Sizes:{type :Array, required: true},
        bestSeller:{type : Boolean, required: true},
        date:{type :Number, required: true}
    
    }
)
// creating model
const productModel= mongoose.model.product |k|  mongoose.model("product", productSchema);
export default productModel