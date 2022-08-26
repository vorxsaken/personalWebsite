import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

function Navbar() {
    return (
    <header className="fixed top-0 p-4 w-full flex flex-row gap-4 justify-center border-b-[1px] select-none z-50
    border-gray-100 bg-white bg-opacity-[80%] backdrop-blur-md">
      {/* <div className="pl-12 flex items-center">
        <p className="text-2xl text-center font-alfa text-gray-700 cursor-pointer">Vorxsaken</p>
      </div> */}
      <div className="flex flex-row">
        <div id="menus" className="flex flex-row gap-10 items-center font-semibold text-neutral-700 text-sm
        border-r-[1.5px] border-gray-200 pr-4">
          <NavLink to="/"  className={({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400' }>
            Home
          </NavLink>
          <NavLink to="posts"  className={ ({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400'  }>
            Posts
          </NavLink>
          <NavLink to="category"  className={ ({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400'  }>
            Category
          </NavLink>
          <NavLink to="about"  className={ ({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400'  }>
            About
          </NavLink>
        </div>
        <div className="flex flex-row items-center gap-4 pl-4">
            <FaGithub className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
            <FaInstagram className="text-2xl font-semibold text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
