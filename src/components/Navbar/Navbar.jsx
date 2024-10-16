import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className='bg-black text-white flex items-center justify-between py-4 px-10'>
        <div className='text-2xl font-bold cursor-pointer'>DIMS</div>
        {
          isLoggedIn ? (
            <Link to="/profile"><button className='bg-[#eb5d3a] border border-1 border-[rgba(119,119,125,0.2)] px-4 py-2 rounded-md'>Profile</button></Link>
          ) : (
            <Link to="/login"><button className='bg-[#eb5d3a] border border-1 border-[rgba(119,119,125,0.2)] px-4 py-2 rounded-md'>Login</button></Link>
          )
        }

    </div>
  )
}

export default Navbar