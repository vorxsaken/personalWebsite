import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill, BsFilePlusFill, BsFileMinus }
from "react-icons/bs";
import {AiFillMinusSquare} from 'react-icons/ai';
import Buttons from "../components/Buttons";

function CreateProject() {
  const file = useRef(null);
  var previewBox = useRef(null);
  const [count, setCount] = useState(1);
  let [image, setImage] = useState([1]);
  let [blob, setBlob] = useState([1]);
  let [urlImage, setUrlImage] = useState([1]);
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [github, setGithub] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaxRight, setIsMaxRight] = useState(true);
  const [isNoLeft, setIsNoLeft] = useState(0);

  useEffect(
    () => {
      // if (image[count] != '') {
      //   const url = URL.createObjectURL(image[image.length - 1]);
      //   setBlob([...blob, url]);
      // }
    },
    [image]
  );
  var currentIndex = 0;
  const input1 = (index) => {
    currentIndex = index;
    file.current.click();
  };

  const addPreview = () => {
    setImage([...image, 1]);
    setBlob([...blob, 1]);
    setUrlImage([...urlImage, 1]);
    setCount(count + 1);
    setTimeout(() => {
      previewBox.current.scrollLeft += 608;
    }, 100)
  };

  const popPreview = () => {
    previewBox.current.scrollLeft -= 608;
    image.pop();
    blob.pop();
    urlImage.pop();
    setCount(count - 1);
  }

  const pushImage = e => {
    // change specific index image; 
    let newImage = [...image];
    newImage[currentIndex] = 0;
    setImage(newImage);
    // change blob in specific index array 
    let newBlob = [...blob]
    newBlob[currentIndex] = blob;
    setBlob(newBlob)
    // change urlImage in specific index array
    let imageUrl = URL.createObjectURL(e.target.files[0]);
    let newImageUrl = [...urlImage];
    newImageUrl[currentIndex] = imageUrl
    setUrlImage(newImageUrl);
  };

  const preview = image.map((i, index) =>
    <div key={index}>
      {image[index] === 1
        ? <div
            className="w-[600px] h-[300px] border-[2px] rounded-md border-dashed border-slate-300 
          flex flex-col gap-4 justify-center items-center cursor-pointer"
            onClick={() => {input1(index)}}
          >
            <FaPlusCircle className="text-4xl text-slate-300 " />
            <span className="text-lg text-slate-300 font-semibold ">
              Tambahkan Gambar {index + 1} Project 
            </span>
          </div>
        : 
          <div className="max-h-[300px] w-[600px] flex justify-center">
            <img
              onClick={() => {input1(index)}}
              src={urlImage[index]}
              className="w-auto max-h-[300px] max-w-[600px] h-auto cursor-pointer"
              alt=""
            />
          </div>
          }
    </div>
  );

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
      window.alert("Field Tidak Boleh Kosong");
    }
  };

  const scrollLeft = () => {
    previewBox.current.scrollLeft -= 608;
    if(count > 1){
      setCount(count - 1);
    }
  }
  const scrollRight = () => {
    previewBox.current.scrollLeft += 608;
    if(count < image.length){
      setCount(count + 1);
    }

  }
  const scrollPreviewObserver = () => {
    if(previewBox.current.scrollLeft >= (previewBox.current.scrollWidth - previewBox.current.offsetWidth) - count){
      setIsMaxRight(true)
    } else {
      setIsMaxRight(false);
    }

    setIsNoLeft(previewBox.current.scrollLeft);
  }

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
          onChange={e => {
            pushImage(e);
          }}
          className="hidden"
        />
        <div className="relative flex items-center">
          {
            isMaxRight ? (
              <span className="absolute -right-14 cursor-pointer flex flex-col 
              z-50 gap-2">
                <BsFilePlusFill onClick={() => { addPreview()}} className="text-4xl font-semibold text-slate-600">
                </BsFilePlusFill>
                {
                  image.length > 1 && (
                    <BsFileMinus onClick={() => { popPreview() }} className="text-4xl font-semibold text-slate-600">
                    </BsFileMinus>
                  )
                }
              </span>
            ) : (
              <motion.span
              initial={{scale: 0}} animate={{scale: 1}} transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
              onClick={() => { scrollRight() }} className="absolute -right-14 cursor-pointer z-50">
                <BsFillArrowRightSquareFill className="text-4xl font-semibold text-slate-600">
                </BsFillArrowRightSquareFill>
              </motion.span>
            )
          }

          {
            isNoLeft != 0 && (
              <span onClick={() => { scrollLeft();}} className="absolute -left-14 cursor-pointer z-50">
                <BsFillArrowLeftSquareFill className="text-4xl font-semibold text-slate-600"></BsFillArrowLeftSquareFill>
              </span>
            )
          }
          <div
            ref={previewBox}
            onScroll={() => {scrollPreviewObserver()}}
            className="w-[600px] h-auto relative flex flex-row gap-2 no-scrollbar overflow-x-auto items-center py-2"
          >
            {preview}
          </div>
          <div className="absolute -bottom-4 w-full text-end text-xs">
            {count} / {image.length}
          </div>
        </div>
        <div className="w-[400px] h-auto flex flex-col gap-2 items-center">
          <span className="text-xs text-slate-500">Project Name :</span>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full h-10 border-[1px] border-slate-500 rounded-md p-4 focus:outline-none text-slate-500
            text-sm"
          />
        </div>
        <div className="w-[400px] h-auto flex flex-col gap-2 items-center">
          <span className="text-xs text-slate-500">Description :</span>
          <textarea
            value={deskripsi}
            onChange={e => setDeskripsi(e.target.value)}
            className="w-full h-36 border-[1px] border-slate-500 rounded-md p-2 focus:outline-none text-slate-500
            text-[0.8rem]"
          />
        </div>
        <div className="w-[400px] h-auto flex flex-col gap-2 items-center">
          <span className="text-xs text-slate-500">Github Link:</span>
          <input
            value={github}
            onChange={e => setGithub(e.target.value)}
            type="text"
            className="w-full h-10 border-[1px] border-slate-500 rounded-md p-4 focus:outline-none text-slate-500
            text-[0.8rem]"
          />
        </div>
        <Buttons loading={isLoading} onClick={post} text="Post" />
      </div>
    </motion.div>
  );
}

export default CreateProject;
