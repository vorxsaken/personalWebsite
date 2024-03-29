import React, { useEffect } from 'react'
import Card from "../components/Card";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../slice/loaderSlice'
import { initEditProject, filterMyProject, initViewProject } from "../slice/projectsSlice";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { useCustomeTitle } from "../utils";

function Projects() {
  const access = useSelector(state => state.user.adminAccess);
  const projects = useSelector(state => state.projects.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useCustomeTitle("Projects");

  const editProjects = (id) => {
    dispatch(setState(true));
    fetch(`http://localhost:3010/admin/get-project/${id}`).then(result => result.json()).then((data) => {
      dispatch(initEditProject({
        _id: data[0]._id,
        title: data[0].title,
        github: data[0].github,
        deskripsi: data[0].deskripsi,
        imageHeader: data[0].imageHeader,
        techStack: data[0].techStack
      }))
      setTimeout(() => {
        dispatch(setState(false));
        navigate('/create-project');
      }, 400);
    })
  }

  const deleteProject = async (id) => {
    dispatch(setState(true));

    await fetch(`http://localhost:3010/admin/delete-project/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("_xvd")
      }
    }).then(result => result.json()).then(data => {
      dispatch(filterMyProject(id));
      dispatch(setState(false));
    })
  }

  const goToProject = async (id) => {
    dispatch(setState(true));

    await fetch(`http://localhost:3010/admin/get-project/${id}`).then(result => result.json()).then((data) => {
      dispatch(initViewProject({
        _id: data[0]._id,
        title: data[0].title,
        github: data[0].github,
        techStack: data[0].techStack,
        deskripsi: data[0].deskripsi,
        imageHeader: data[0].imageHeader,
      }))
      dispatch(setState(false));
      setTimeout(() => {
        dispatch(setState(false));
        navigate('/project-view');
      })
    })
  }

  useEffect(() => {
    return () => {
      document.documentElement.scrollTop = 0;
    }
  }, [])

  const cards = projects.map((project) => {
    return (
      <div className="relative transition-all duration-100 hover:shadow-xl hover:scale-[1.02]" key={project._id}>
        {access && (
          <span className="absolute -top-1 -right-1 flex flex-row gap-2">
            <motion.span
              onClick={() => { deleteProject(project._id) }}
              whileHover={{ scale: 1.06 }}
              className="p-3 rounded-full shadow-md flex justify-center items-center bg-slate-600 cursor-pointer"
            >
              <FaTrashAlt className="text-xs  text-white z-50"></FaTrashAlt>
            </motion.span>
            <motion.span
              onClick={() => { editProjects(project._id) }}
              whileHover={{ scale: 1.06 }}
              className="p-3 rounded-full shadow-md flex justify-center items-center bg-slate-600 cursor-pointer"
            >
              <FaPencilAlt className="text-xs  text-white z-50"></FaPencilAlt>
            </motion.span>
          </span>
        )}
        <div onClick={() => { goToProject(project._id) }}>
          <Card
            row={false}
            img={project.imageHeader.pic[0].url}
            title={project.title}
            des={project.deskripsi}
            date={project.created_at}
          />
        </div>
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
