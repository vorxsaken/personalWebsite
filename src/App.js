import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./view/Home";
import Posts from "./view/Posts";
import Category from "./view/Category";
import About from "./view/About";
import Footer from "./components/Footer";
import Login from "./view/Login";
import Unknown from "./view/Unknown";
import CreatePost from "./view/CreatePost";
import CreateProject from "./view/CreateProject";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const access = useSelector((state) => state.user.adminAccess);

  return (
    <div className="overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="mt-16 select-none overflow-y-hidden flex justify-center items-center">
        <AnimatePresence exitBeforeEnter={true} initial={true}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="posts" element={<Posts />} />
            <Route path="category" element={<Category />} />
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
      <Footer />
    </div>
  );
}

export default App;
