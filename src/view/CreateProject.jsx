import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import Buttons from "../components/Buttons";

function CreateProject() {
  const file = useRef(null);
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);
  const [title, setTitle] = useState(null);
  const [deskripsi, setDeskripsi] = useState(null);
  const [github, setGithub] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (image != null) {
      const url = URL.createObjectURL(image);
      setBlob(url);
    }
  }, [image]);

  const input = () => {
    file.current.click();
  };

  const post = async () => {
    if (title && deskripsi && github && Image) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("deskripsi", deskripsi);
      formData.append("github", github);
      formData.append("file", image);

      await fetch("http://localhost:3010/admin/upload-project", {
        method: "POST",
        body: formData,
      });

      setTitle("");
      setDeskripsi("");
      setImage(null);
      setGithub("");
      setIsLoading(false);
      window.alert("project uploaded");
    } else {
      window.alert('Field Tidak Boleh Kosong')
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen pt-8"
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <span className="text-3xl font-pacifico font-bold text-slate-500">
          Create Project
        </span>
        <input
          type="file"
          ref={file}
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          className="hidden"
        />
        {!image ? (
          <div
            className="w-[600px] h-[300px] border-[2px] rounded-md border-dashed border-slate-300 
          flex flex-col gap-4 justify-center items-center cursor-pointer"
            onClick={input}
          >
            <FaPlusCircle className="text-4xl text-slate-300 " />
            <span className="text-lg text-slate-300 font-semibold ">
              Tambahkan Gambar Project
            </span>
          </div>
        ) : (
          <img
            src={blob}
            onClick={input}
            className="w-auto max-w-[600px] h-auto cursor-pointer"
            alt=""
          />
        )}
        <div className="w-[400px] h-auto flex flex-col gap-2 items-center">
          <span className="text-xs text-slate-500">Project Name :</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 border-[1px] border-slate-500 rounded-md p-4 focus:outline-none text-slate-500
            text-sm"
          />
        </div>
        <div className="w-[400px] h-auto flex flex-col gap-2 items-center">
          <span className="text-xs text-slate-500">Description :</span>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full h-36 border-[1px] border-slate-500 rounded-md p-2 focus:outline-none text-slate-500
            text-[0.8rem]"
          ></textarea>
        </div>
        <div className="w-[400px] h-auto flex flex-col gap-2 items-center">
          <span className="text-xs text-slate-500">Github Link:</span>
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            type="text"
            className="w-full h-10 border-[1px] border-slate-500 rounded-md p-4 focus:outline-none text-slate-500
            text-[0.8rem]"
          ></input>
        </div>
        <Buttons loading={isLoading} onClick={post} text="Post"></Buttons>
      </div>
    </motion.div>
  );
}

export default CreateProject;
