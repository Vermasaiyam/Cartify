const cartModel = require("../../models/cartModel")

const addToCart = async(req,res)=>{
    try{
        const { productId } = req?.body;
        const currentUser = req.userId;

        const isProductAvailable = await cartModel.findOne({ productId, userId: currentUser });

        console.log("isProductAvailable:- ",isProductAvailable);

        if(isProductAvailable){
            return res.json({
                message : "Product already exits in cart.",
                success : false,
                error : true,
            });
        };

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        };

        const newAddToCart = new cartModel(payload);
        const saveProduct = await newAddToCart.save();


        return res.json({
            data : saveProduct,
            message : "Product Added in Cart.",
            success : true,
            error : false
        });
        

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        });
    }
}


module.exports = addToCart;