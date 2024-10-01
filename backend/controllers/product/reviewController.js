// Create New Review or Update the review
const productModel = require('../../models/productModel');

exports.createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await productModel.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.noOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
};

// get all reviews
exports.getProductReviews = async (req, res, next) => {
    const product = await productModel.findById(req.query.id);
    if (!product) {
        return next(new ErrorHander("product not found", 404));
    }
    res.status(200).json({
        message: "Route is Working Fine",
        reviews: product.reviews,
    });
};


//delete review
exports.deleteReview = async (req, res, next) => {
    const product = await productModel.findById(req.query.productId);
    // console.log(product);
    if (!product) {
        return next(new ErrorHander("product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    let ratings;
    if (reviews.length === 0) {
        ratings = 0;
    }
    else {
        ratings = avg / reviews.length;
    }

    const noOfReviews = reviews.length;

    await productModel.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            noOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        message: "deleted review succesfullty",
    });
};