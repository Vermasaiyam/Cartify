// const domain = "https://cartify-ebon.vercel.app/"
const domain = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const SummaryApi = {
    signUP: {
        url: `${domain}/api/signup`,
        method: "post"
    },
    logIn: {
        url: `${domain}/api/login`,
        method: "post"
    },
    current_user: {
        url: `${domain}/api/user-details`,
        method: "get"
    },
    logout: {
        url: `${domain}/api/userLogout`,
        method: 'get'
    },
    admin_panel: {
        url: `${domain}/api/adminPanel`,
        method: 'get'
    },
    allUsers: {
        url: `${domain}/api/all-users`,
        method: 'get'
    },
    updateUser: {
        url: `${domain}/api/update-user`,
        method: 'post'
    },
    uploadProduct: {
        url: `${domain}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${domain}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${domain}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${domain}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${domain}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${domain}/api/product-details`,
        method: 'post'
    },
    addToCart: {
        url: `${domain}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${domain}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${domain}/api/view-cart-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${domain}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct : {
        url : `${domain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${domain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${domain}/api/filter-product`,
        method : 'post'
    }
}


export default SummaryApi; 