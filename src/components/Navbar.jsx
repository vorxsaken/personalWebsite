import React from "react";
import { FaGithub, FaInstagram, FaPencilAlt, FaFolderPlus } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

function Navbar() {
    const access = useSelector(state => state.user.adminAccess)
    let navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("_xvd");
      window.location.reload();
    }
    const createPost = () => {
      navigate("../create-post");  
    }
    const createProject = () => {
      navigate("../create-project")
    }
    return (
    <header className="fixed top-0 p-4 w-full flex flex-row gap-4 justify-center border-b-[1px] select-none z-50
    border-gray-100 bg-white bg-opacity-[80%] backdrop-blur-md">
      {/* <div className="pl-12 flex items-center">
        <p className="text-2xl text-center font-alfa text-gray-700 cursor-pointer">Vorxsaken</p>
      </div> */}
      <div className="flex flex-row">
        <div id="menus" className="flex flex-row gap-6 items-center font-semibold text-neutral-700 text-sm
        border-r-[1.5px] border-gray-200 pr-4">
          <NavLink to="/"  className={({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400' }>
            Home
          </NavLink>
          <NavLink to="posts"  className={ ({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400'  }>
            Posts
          </NavLink>
          <NavLink to="projects"  className={ ({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400'  }>
            Project
          </NavLink>
          <NavLink to="about"  className={ ({isActive}) => isActive ? 'text-red-600' : 'hover:text-red-400'  }>
            About
          </NavLink>
          {
            access && (
              <div onClick={ logout } className="hover:text-red-400 cursor-pointer">
                Logout
              </div>
            )
          }
        </div>
        <div className="flex flex-row items-center gap-4 pl-4">
            <FaGithub className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
            <FaInstagram className="text-2xl font-semibold text-gray-400 hover:text-gray-600 cursor-pointer" />

            {
              access && (
                <span className="flex flex-row gap-4">
                  <FaFolderPlus onClick={ createProject } className="text-xl  font-semibold text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <FaPencilAlt onClick={ createPost } className="text-lg font-semibold text-gray-400 hover:text-gray-600 cursor-pointer"/>
                </span>
              )
            }
        </div>
      </div>
    </header>
  );
}

export default Navbar;
