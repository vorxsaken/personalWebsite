import React, { useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Card from "../components/Card";
import Buttons from "../components/Buttons";
import { useSelector } from "react-redux";
import { setState } from '../slice/loaderSlice'
import { useDispatch } from "react-redux"
import { initEditPost } from "../slice/postSlice"
import { useNavigate } from "react-router-dom"
import { initEditProject } from "../slice/projectsSlice";
import Avatar from "../components/Avatar";
import { useMediaQuery, useCustomeTitle } from "../utils";

function Home() {
  const projectsArray = useSelector(state => state.projects.projects);
  const posts = useSelector(state => state.posts.posts);
  const postList = [...posts];
  var sortedPost = postList.sort((a, b) => { return a.created_at - b.created_at });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scrollYProgress, scrollY } = useScroll();
  const isBig = useMediaQuery('(min-width: 1024px)');
  const isMedium = useMediaQuery('(min-width: 600px)');
  const isSmall = useMediaQuery('(min-width: 400px)');
  const isExtraSmall = useMediaQuery('(min-width: 300px)');
  useCustomeTitle("Home");

  // recent post animation
  const opacityPost = useSpring(useTransform(scrollYProgress, [0, isBig ? 40 : isMedium ? 30 : isSmall ? 20 : isExtraSmall && 10], [0, 100]), { stiffness: 200, damping: 30 });
  const leftPost = useSpring(useTransform(scrollY, [100, 500], [0, isBig ? 128 : isMedium ? 100 : isSmall ? 55 : isExtraSmall && 25]), { stiffness: 200, damping: 30 });
  const recentPostText = useSpring(useTransform(scrollY, [100, 500], [0, -224]), { stiffness: 200, damping: 30 });
  // recent project animation
  const leftProject = useSpring(useTransform(scrollY, isBig ? [600, 1100] : [1800, 2200] , [0, isBig ? -128 : isMedium ? -100 : isSmall ? -55 : isExtraSmall && -20]), { stiffness: 200, damping: 30 });
  const leftProjectText = useSpring(useTransform(scrollY, isBig ? [600, 1100] : [1800, 2200] , [0, 224]), { stiffness: 200, damping: 30 });

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
      row={false}
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
      className="w-full h-full flex flex-col justify-center items-center"
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
            <Avatar />
            <p className="text-3xl font-bold text-gray-500 max-w-lg text-center">
              Hi There, Iam <span className="text-slate-800">Vorxsaken</span>
            </p>
            <p className="text-xs font-normal text-center text-black max-w-md">
              Iam a self taught web/software developer, i mainly code in javascript using reactJS, vueJS framework or just vanilla, currently iam still try
              get used to using TypeScript, I hope you enjoy the content of this website or find
              something useful.
            </p>
          </div>
        </div>
      </div>

      {/* content posts list summary */}
      <div className="xl:w-[1500px] lg:w-full md:w-[300px] sm:[100px] h-auto flex flex-col gap-2 bg-white mt-4 relative">
        <motion.p
          style={{ x: recentPostText, opacity: opacityPost }}
          className="text-center font-bold text-2xl text-slate-600 mt-10 relative -right-56 opacity-0">
          <motion.span
            className="before:w-40 before:h-[3px] before:-bottom-1 before:absolute 
          before:rounded-xl before:bg-gradient-to-r before:from-red-400"
          >
            Recent Posts
          </motion.span>
        </motion.p>
        <motion.div
          style={{ opacity: opacityPost, x: leftPost }}
          className="px-4 py-4 flex flex-row flex-wrap gap-6 items-center opacity-0">
          {cards}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
          className="py-4 flex flex-row items-center justify-center">
          <motion.span whileHover={{ scale: 1.03, y: -5, x: 2.5}} onClick={() => { navigate("/posts") }}>
            <Buttons text="More .." />
          </motion.span>
        </motion.div>
      </div>

      {/* constent project list summary */}
      <div className="xl:w-[1500px] lg:w-full md:w-[600px] sm:[300px] h-auto flex flex-col gap-2 bg-white">
        <motion.div
        style={{ x: leftProjectText }}
          className="text-center font-bold text-2xl text-slate-600 mt-10 relative -left-56">
          <span
            className="before:w-48 before:h-[3px] before:-bottom-1 before:absolute 
          before:rounded-xl before:bg-gradient-to-r before:from-red-400"
          >
            Recent Projects
          </span>
        </motion.div>
        <motion.div
          style={{ x: leftProject }}
          className="px-4 py-4 flex flex-row flex-wrap gap-6 items-center justify-end relative">
          {projects}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
          className="py-4 flex flex-row items-center justify-center">
          <motion.span whileHover={{ scale: 1.03, y: -5, x: 2.5}} onClick={() => { navigate("/projects") }} className=
          'bg-blue-500 rounded-md shadow-lg'>
            <Buttons text="More .." bgColor={'bg-none'} />
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
