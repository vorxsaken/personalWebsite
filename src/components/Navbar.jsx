import React, { useState } from "react";
import { FaGithub, FaInstagram, FaPencilAlt, FaFolderPlus } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useMediaQuery } from "../utils";


const hamburgerVariant = {
  open: {
    transition: {
      type: "spring",
      duration: 0.6
    }
  },
  closed: {
    transition: {
      type: "spring",
      duration: 0.6
    }
  }
}

const menuVariant = {
  init: {
    opacity: 0
  },
  enter: {
    delay: 0.8,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
    }
  },
  leave: {
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "spring"
    }
  }
}

function Navbar() {
  const access = useSelector(state => state.user.adminAccess)
  let navigate = useNavigate();
  const isSmall = useMediaQuery('(max-width: 550px)');
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

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
    <header className="fixed top-0 p-4 w-full flex flex-row gap-4 justify-center border-b-[1px] select-none z-40
    border-gray-100 bg-white bg-opacity-[80%] backdrop-blur-md">
      <div className="flex flex-row">
        {isSmall ? (
          <div className="font-bold flex flex-col gap-4">
            <span className="text-slate-700 text-base w-screen text-center relative">
              <span className="text-xl">vorxsaken</span>
              <motion.span
                onClick={() => toggleOpen()}
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={hamburgerVariant}
                className="absolute right-4">
                <motion.svg width="30" height="25" className="" viewBox="0 0 30 15">
                  <motion.path
                    variants={{
                      closed: { d: "M 2 2.5 L 20 2.5" },
                      open: { d: "M 3 16.5 L 17 2.5" }
                    }}
                    stroke="rgb(0, 0, 0)"
                    strokeWidth={2}
                    strokeLinecap="round" />
                  <motion.path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                      open: { opacity: 0, x: 100 },
                      closed: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.1 }}
                    stroke="rgb(0, 0, 0)"
                    strokeWidth={2}
                    strokeLinecap="round" />
                  <motion.path
                    variants={{
                      closed: { d: "M 2 16.346 L 20 16.346" },
                      open: { d: "M 3 2.5 L 17 16.346" }
                    }}
                    stroke="rgb(0, 0, 0)"
                    strokeWidth={2}
                    strokeLinecap="round" />
                </motion.svg>
              </motion.span>
            </span>
            <AnimatePresence exitBeforeEnter>
              {
                isOpen && (
                  <motion.div onClick={() => toggleOpen()} initial="init" animate="enter" exit="leave" variants={menuVariant} className="w-full py-4 flex flex-col gap-8 justif-cente items-center">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                      Home
                    </NavLink>
                    <NavLink to="posts" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                      Posts
                    </NavLink>
                    <NavLink to="projects" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                      Project
                    </NavLink>
                    <NavLink to="about" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                      About
                    </NavLink>
                    {
                      access && (
                        <div onClick={logout} className="hover:text-red-400 cursor-pointer">
                          Logout
                        </div>
                      )
                    }
                    <div className="flex flex-row justify-center items-center gap-4">
                      <FaGithub className="text-3xl text-gray-800 hover:text-gray-600 cursor-pointer" />
                      <FaInstagram className="text-3xl font-semibold text-pink-800 hover:text-gray-600 cursor-pointer" />
                    </div>
                  </motion.div>
                )
              }
            </AnimatePresence>
          </div>
        ) : (
          <>
            <div id="menus" className="flex flex-row gap-6 items-center font-semibold text-neutral-700 text-sm
        border-r-[1.5px] border-gray-200 pr-4">
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                Home
              </NavLink>
              <NavLink to="posts" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                Posts
              </NavLink>
              <NavLink to="projects" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                Project
              </NavLink>
              <NavLink to="about" className={({ isActive }) => isActive ? 'text-red-600' : 'hover:text-red-400'}>
                About
              </NavLink>
              {
                access && (
                  <div onClick={logout} className="hover:text-red-400 cursor-pointer">
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
                    <FaFolderPlus onClick={createProject} className="text-xl  font-semibold text-gray-400 hover:text-gray-600 cursor-pointer" />
                    <FaPencilAlt onClick={createPost} className="text-lg font-semibold text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </span>
                )
              }
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
