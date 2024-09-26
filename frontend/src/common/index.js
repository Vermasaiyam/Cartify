const domain = "http://localhost:8000"

const SummaryApi = {
    signUP : {
        url : `${domain}/api/signup`,
        method : "post"
    },
    logIn : {
        url : `${domain}/api/login`,
        method : "post"
    },
    current_user : {
        url : `${domain}/api/user-details`,
        method : "get"
    },
    logout : {
        url : `${domain}/api/userLogout`,
        method : 'get'
    },
    admin_panel : {
        url : `${domain}/api/adminPanel`,
        method : 'get'
    },
    allUsers : {
        url : `${domain}/api/all-users`,
        method : 'get'
    },
    updateUser : {
        url : `${domain}/api/update-user`,
        method : 'post'
    },
    uploadProduct : {
        url : `${domain}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${domain}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${domain}/api/update-product`,
        method : 'post'
    },
    categoryProduct : {
        url : `${domain}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${domain}/api/category-product`,
        method : 'post'
    },
}


export default SummaryApi; 