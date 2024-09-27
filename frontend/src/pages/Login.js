import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.logIn.url, {
            method: SummaryApi.logIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const Api = await response.json();

        if (Api.success) {
            toast.success(Api.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (Api.error) {
            toast.error(Api.message);
        }

    }

    console.log("data login", data);

    return (
        <section id='login'>
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt="Login Icon" />
                    </div>

                    <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter Your Email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' 
                                    required/>
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter Your Password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' 
                                    required/>
                                    
                                <div className="cursor-pointer text-xl" onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }


                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password?
                            </Link>
                        </div>
                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                    </form>

                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>

                </div>
            </div>
        </section>
    )
}

export default Login
