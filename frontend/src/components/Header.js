import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuDisplay, setMenuDisplay] = useState(false);

    const user = useSelector(state => state?.user?.user);

    console.log("user", user);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout.url, {
            method: SummaryApi.logout.method,
            credentials: 'include'
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");
        }

        if (data.error) {
            toast.error(data.message);
        }

    }

    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>
            <div className=" h-full container mx-auto flex items-center px-4 justify-between">
                <div className="text-red-600 font-bold text-2xl">
                    <Link to={"/"} className='flex flex-row items-center'>
                        <img src="logo.jpg" alt="Cartify" width={60} height={10} />
                        Cartify
                    </Link>
                </div>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                    <input type='text' placeholder='Search products...' className='w-full outline-none' />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                        <FaSearch />
                    </div>
                </div>

                <div className='flex items-center gap-7'>
                    <div className='relative flex justify-center'>
                        <div className='text-3xl cursor-pointer' onClick={()=>setMenuDisplay(prev => !prev)}>
                            {
                                user?.profilePic ? (
                                    <img src={user?.profilePic} alt={`${user.name}'s Profile Pic`} className='w-10 h-10 rounded-full' />
                                ) : (
                                    <FaUserCircle />
                                )
                            }
                        </div>

                        {
                            menuDisplay && (
                                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                                    <nav>
                                        <Link to={"admin-panel"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                                    </nav>
                                </div>
                            )
                        }

                    </div>
                    <div className="text-3xl cursor-pointer relative">
                        <span><IoMdCart /></span>
                        <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-sm'>0</p>
                        </div>
                    </div>
                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                            )
                                : (
                                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                                )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
