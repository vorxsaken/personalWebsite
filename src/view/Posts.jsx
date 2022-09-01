import React from "react";
import { motion } from "framer-motion";
import Card from '../components/Card';
import { useSelector } from "react-redux";

function Posts() {
  const posts = useSelector(state => state.posts.posts);
  var cards = posts.map((post) => {
    return <Card row={ true } tags={post.tags} key={post._id} img={post.imageHeader} title={post.title} des={post.subtitle} />
  }
  )
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen p-8 flex flex-col items-center gap-8"
    >
      <span className="text-5xl text-slate-600 font-pacifico font-semibold">Posts</span>
      <input type="text" className="w-96 p-5 h-6 focus:outline-none
       border-[1.5px] border-slate-600 rounded-md focus:border-slate-400 text-sm
       placeholder:text-slate-600 focus:placeholder:text-slate-400"
       placeholder="Search ..." />
       <div className="w-full h-auto flex flex-row justify-center gap-6">
        { posts.length > 0 ? cards :  <span className="text-xl text-slate-400">Post Kosong</span>  }
       </div>
    </motion.div>
  );
}

export default Posts;
