import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Buttons from "../components/Buttons";
import { useSelector } from "react-redux";
import { setState } from '../slice/loaderSlice'
import { useDispatch } from "react-redux"
import { initEditPost } from "../slice/postSlice"
import { useNavigate } from "react-router-dom"
import { initEditProject } from "../slice/projectsSlice";

function Home() {
  const projectsArray = useSelector(state => state.projects.projects);
  const posts = useSelector(state => state.posts.posts);
  const postList = [...posts];
  var sortedPost = postList.sort((a, b) => { return a.created_at - b.created_at });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToPost = async (id) => {
    dispatch(setState(true));
    fetch(`http://localhost:3010/admin/get-post/${id}`).then(getPost => getPost.json()).then(data => {
      dispatch(initEditPost({ _id: data._id, title: data.title, subtitle: data.subtitle, text: data.text, tags: data.tags, imageHeader: data.imageHeader, created_at: data.created_at }))
      setTimeout(() => {
        navigate("/post-view");
        dispatch(setState(false));
      }, 400)
    })
  }

  const goToProject = async (id) => {
    dispatch(setState(true));
    fetch(`http://localhost:3010/admin/get-project/${id}`).then(getProject => getProject.json()).then(data => {
      dispatch(initEditProject({
        _id: data[0]._id,
        title: data[0].title,
        github: data[0].github,
        techStack: data[0].techStack,
        deskripsi: data[0].deskripsi,
        imageHeader: data[0].imageHeader,
      }))

      setTimeout(() => {
        navigate("/project-view");
        dispatch(setState(false));
      }, 400)
    })
  }
  // posts cards
  const cards = sortedPost.slice(0, 4).map((post) => (
    <Card
      onClick={() => goToPost(post._id)}
      key={post._id}
      img={post.imageHeader}
      title={post.title}
      des={post.subtitle}
      tags={post.tags}
      row={true}
      date={post.created_at}
    />
  ));

  // project cards
  const projects = projectsArray.slice(0, 4).map((project) => (
    <Card
      onClick={() => goToProject(project._id)}
      key={project._id}
      img={project.imageHeader.pic[0].url}
      row={false}
      title={project.title}
      des={project.deskripsi}
      date={project.created_at}
    />
  ));

  useEffect(() => {
    return () => {
      document.documentElement.scrollTop = 0;
    }
  }, [])

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-full"
    >
      {/* profil container */}
      <div className="w-full h-[85vh]">
        {/* avatar container */}
        <div
          className="w-full h-[80vh] flex justify-center items-center gap-3 bg-white 
          bg-opacity-[1%]"
        >
          {/* avatar */}
          <div
            className="flex flex-col flex-grow-0 justify-center items-center px-8 pb-10 gap-3 bg-white rounded-3xl
           bg-opacity-[60%] backdrop-blur-md"
          >
            <div
              className="w-[220px] h-[220px] mt-10 border-4 border-white rounded-full bg-black 
            overflow-hidden relative drop-shadow-lg bg-cover bg-right"
              style={{
                backgroundImage: `url(${require("../assets/img/1.jpg")})`,
              }}
            ></div>
            <p className="text-3xl font-bold text-gray-500 max-w-lg text-center">
              Hi There, Iam <span className="text-slate-800">Vorxsaken</span>
            </p>
            <p className="text-sm font-normal text-center text-black max-w-md">
              Iam a self taught web/software developer, I created this website
              to express my thoughts or just to show the projects that I have
              made. I hope you enjoy the content of this website or find
              something useful.
            </p>
          </div>
        </div>
      </div>

      {/* content posts list summary */}
      <div className="w-full h-auto flex flex-col gap-2 bg-white mt-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2, type: "spring" }}
          className="text-center font-bold text-2xl text-slate-600 mt-10 relative">
          <span
            className="before:w-40 before:h-[3px] before:-bottom-1 before:absolute 
          before:rounded-xl before:bg-gradient-to-r before:from-red-400"
          >
            Recent Posts
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2, type: "spring" }}
          className="px-4 py-4 flex flex-row flex-wrap gap-6 items-center justify-center">
          {cards}
        </motion.div>
        <div className="py-4 flex flex-row items-center justify-center">
          <span onClick={() => { navigate("/posts") }}>
            <Buttons text="More .." />
          </span>
        </div>
      </div>

      {/* constent project list summary */}
      <div className="w-full h-auto flex flex-col gap-2 bg-white">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2, type: "spring" }}
          className="text-center font-bold text-2xl text-slate-600 mt-10 relative">
          <span
            className="before:w-48 before:h-[3px] before:-bottom-1 before:absolute 
          before:rounded-xl before:bg-gradient-to-r before:from-red-400"
          >
            Recent Projects
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2, type: "spring" }}
          className="px-4 py-4 flex flex-row flex-wrap gap-6 items-center justify-center">
          {projects}
        </motion.div>
        <div className="py-4 flex flex-row items-center justify-center">
          <span onClick={() => { navigate("/projects")}}>
            <Buttons text="More .." />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
