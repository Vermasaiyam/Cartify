import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AdminPanel = () => {
    
    const user = useSelector(state => state?.user?.user);

    return (
        <div className='min-h-[calc(100vh-120px)] flex'>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 mt-6 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center' >
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={`${user.name}'s Profile Pic`} className='w-20 h-20 rounded-full' />
                            ) : (
                                <FaUserCircle />
                            )
                        }
                    </div>
                    <p className='capitalize text-xl font-semibold pt-2'>{user?.name}</p>
                    <p>{user?.role}</p>
                </div>
            </aside>
            <main>
                bjnkl
            </main>
        </div>
    )
}

export default AdminPanel
