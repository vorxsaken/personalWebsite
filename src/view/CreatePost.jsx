import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Buttons from "../components/Buttons";
import { FaPlusCircle } from "react-icons/fa";


function CreatePost() {
  const file = useRef(0);
  const [title, setTitle] = useState(null);
  const [value, setValue] = useState(null);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen flex gap-6 flex-col items-center py-10 text-center"
    >
      <span className="text-4xl font-pacifico text-slate-500 mb-12">
        Create A Post
      </span>
      <div>
        <input
          onChange={(n) => setTitle(n.target.value)}
          type="text"
          className="min-w-[500px] w-auto px-4 py-3 border 
            border-slate-400 placeholder:text-center text-center rounded-md focus:outline-none text-sm text-slate-500"
          placeholder="Title"
        />
      </div>
      <div
        className="w-auto h-32 min-w-[900px] border-[2px] rounded-md border-dashed border-slate-300
        flex flex-col gap-2 justify-center items-center cursor-pointer"
        onClick={() => {
          file.current.click();
        }}
      >
        <input className="hidden" ref={file} type="file" />
        <FaPlusCircle className="font-semibold text-slate-400 text-3xl" />
        <span className="text-base text-slate-400 text-lg">
          Tambahkan Header Image
        </span>
      </div>
      <div className="w-auto min-w-[900px]">
      </div>
      <div className="mt-12">
        <Buttons>Post</Buttons>
      </div>
    </motion.div>
  );
}

export default CreatePost;
