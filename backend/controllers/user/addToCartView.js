const cartModel = require("../../models/cartModel")


const addToCartView = async(req,res)=>{
    try{
        const currentUser = req.userId;

        const allProduct = await cartModel.find({
            userId : currentUser
        }).populate("productId");

        res.json({
            data : allProduct,
            success : true,
            error : false
        });

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports =  addToCartView;