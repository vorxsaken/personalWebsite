import React, { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from 'react-icons/io'
import Navbar from "./components/Navbar";
import Home from "./view/Home";
import Posts from "./view/Posts";
import Projects from "./view/Projects";
import About from "./view/About";
import Footer from "./components/Footer";
import Login from "./view/Login";
import Unknown from "./view/Unknown";
import CreatePost from "./view/CreatePost";
import CreateProject from "./view/CreateProject";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

function App() {
  const location = useLocation();
  const access = useSelector((state) => state.user.adminAccess);
  const [isToTop, setIsToTop] = useState(false);

  const scrollTotop = () => {
    document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 140) {
        setIsToTop(true)
      } else {
        setIsToTop(false)
      }
    })
  }, [])

  return (
    <div className="overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="mt-16 h-auto select-none flex justify-center items-center">
        <AnimatePresence exitBeforeEnter={true} initial={true}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="posts" element={<Posts />} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Unknown />} />
            {access && (
              <>
                <Route path="create-post" element={<CreatePost />} />
                <Route path="create-project" element={<CreateProject />} />
              </>
            )}
            {!access && <Route path="wkwkwk" element={<Login />} />}
          </Routes>
        </AnimatePresence>
      </main>
      {
        isToTop && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
            onClick={scrollTotop}
            className="fixed bottom-8 right-10 w-10 h-10 rounded-md shadow-lg bg-slate-500 flex 
          justify-center items-center cursor-pointer z-50">
            <IoIosArrowUp className="text-2xl text-white " />
          </motion.div>
        )
      }
      <Footer />
    </div>
  );
}

export default App;
