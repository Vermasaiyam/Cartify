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
}


export default SummaryApi; 