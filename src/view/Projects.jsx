import React, { useEffect } from 'react'
import Card from "../components/Card";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

function Projects() {
  const access = useSelector(state => state.user.adminAccess);
  const projects = useSelector(state => state.projects.projects);
  
  useEffect(() => {
    return () => {
      document.documentElement.scrollTop = 0;
    }
  }, [])

  const cards = projects.map((project) => {
    return (
      <div className="relative" key={project._id}>
        {access && (
          <span className="absolute -top-1 -right-1 flex flex-row gap-2">
            <motion.span
              whileHover={{ scale: 1.06 }}
              className="p-3 rounded-full shadow-md flex justify-center items-center bg-slate-600 cursor-pointer"
            >
              <FaTrashAlt className="text-xs  text-white z-50"></FaTrashAlt>
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.06 }}
              className="p-3 rounded-full shadow-md flex justify-center items-center bg-slate-600 cursor-pointer"
            >
              <FaPencilAlt className="text-xs  text-white z-50"></FaPencilAlt>
            </motion.span>
          </span>
        )}
        <Card
          row={false}
          img={project.imageHeader.pic[0].url}
          title={project.title}
          des={project.deskripsi}
        />
      </div>
    )
  })

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen p-8 flex flex-col items-center gap-14"
    >
      <span className="text-5xl text-slate-600 font-pacifico font-semibold">
        Project
      </span>
      <div className="w-full h-auto flex flex-row flex-wrap justify-center items-start gap-6">
        {projects.length > 0 ? (
          cards
        ) : (
          <span className="text-xl text-slate-400">Project Kosong</span>
        )}
      </div>
    </motion.div>
  )
}

export default Projects
