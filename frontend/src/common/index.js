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
}


export default SummaryApi; 