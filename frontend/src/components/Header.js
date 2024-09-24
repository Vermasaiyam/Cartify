import React from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {

    const user = useSelector(state => state?.user?.user);

    console.log("user", user);
    

    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>
            <div className=" h-full container mx-auto flex items-center px-4 justify-between">
                <div className="text-red-600 font-bold text-2xl">
                    <Link to={"/"} className='flex flex-row items-center'>
                        {/* <Logo w={90} h={50} /> */}
                        <img src="logo.jpg" alt="Cartify" width={60} height={10}/>
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
                    <div className='text-3xl cursor-pointer'>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={`${user.name}'s Profile Pic`} className='w-10 h-10 rounded-full'/>
                            ) : (
                                <FaUserCircle />
                            )
                        }
                    </div>
                    <div className="text-3xl cursor-pointer relative">
                        <span><IoMdCart/></span>
                        <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-sm'>0</p>
                        </div>
                    </div>
                    <div>
                        <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
