import React, { useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user])

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-36 mt-4 flex justify-center items-center flex-col'>

                    {
                        user?._id && (
                            <div className='text-6xl cursor-pointer relative flex justify-center' >
                                {
                                    user?.profilePic ? (
                                        <img src={user?.profilePic} alt={`${user.name}'s Profile Pic`} className='w-20 h-20 rounded-full' />
                                    ) : (
                                        <FaUserCircle />
                                    )
                                }
                            </div>
                        )
                    }

                    <p className='capitalize text-xl font-semibold pt-2'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                <div className="mt-2">
                    <nav className='grid'>
                        <Link to={'all-users'} className='px-2 py-2 hover:bg-slate-100'>All Users</Link>
                        <Link to={'all-products'} className='px-2 py-2 hover:bg-slate-100'>Product</Link>
                    </nav>
                </div>
            </aside>
            <main className='w-full h-full p-4'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel
