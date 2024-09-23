import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            // {
            //     path : "sign-up",
            //     element : <SignUp/>
            // },
            // {
            //     path : "product-category",
            //     element : <CategoryProduct/>
            // },
            // {
            //     path : "product/:id",
            //     element : <ProductDetails/>
            // },
            // {
            //     path : 'cart',
            //     element : <Cart/>
            // },
            // {
            //     path : "search",
            //     element : <SearchProduct/>
            // },
            // {
            //     path : "admin-panel",
            //     element : <AdminPanel/>,
            //     children : [
            //         {
            //             path : "all-users",
            //             element : <AllUsers/>
            //         },
            //         {
            //             path : "all-products",
            //             element : <AllProducts/>
            //         }
            //     ]
            // },
        ]
    }
])


export default router