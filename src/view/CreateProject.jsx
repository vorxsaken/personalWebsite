import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill, BsFilePlusFill, BsFileMinus } from "react-icons/bs";
import Buttons from "../components/Buttons";
import Compressor from "compressorjs";
import { useDispatch, useSelector } from "react-redux";
import { addProjects, cleanEditProject, filterMyProject, getProjects } from "../slice/projectsSlice.js";


function CreateProject() {
  var file = useRef(null);
  var project = useRef(null);
  var previewBox = useRef(null);
  var deskripsiProject = useRef(null);
  const [count, setCount] = useState(1);
  const [image, setImage] = useState([1]);
  const [blob, setBlob] = useState([1]);
  const [pic, setPic] = useState([1]);
  const [urlImage, setUrlImage] = useState([1]);
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deskripsiHTML, setDeskripsiHTML] = useState('');
  const [github, setGithub] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaxRight, setIsMaxRight] = useState(true);
  const [isNoLeft, setIsNoLeft] = useState(0);
  const [updatedArray, setUpdatedArray] = useState([]);
  const [updatedPicArray, setUpdatedPicArray] = useState([]);
  const [urlImageFromDatabase, setUrlImageFromDatabase] = useState(null);
  const editProject = useSelector(state => state.projects.editProject);
  const dispatch = useDispatch();
  var currentIndex = 0;

  useEffect(() => {
    if (editProject) {
      let urlImage = editProject.imageHeader.src.map(img => img.url);
      let urlPicImage = editProject.imageHeader.pic.map(pics => pics.url);
      let newImage = Array(urlImage.length).fill(0);
      setUrlImageFromDatabase(urlImage);
      setUrlImage(urlImage);
      setImage(newImage);
      setPic(urlPicImage);
      setIsMaxRight(false);
      setTitle(editProject.title)
      setDeskripsi(editProject.deskripsi)
      setGithub(editProject.github)
    }

    return () => {
      dispatch(cleanEditProject())
    }

  }, []);

  const pushNewUpdateToArray = () => {
    if (editProject && currentIndex < urlImageFromDatabase.length && !/\bblob\b/.test(urlImage[currentIndex])) {
      let newUpdatedArray = updatedArray;
      let newUpdatedPicArray = updatedPicArray;
      newUpdatedArray.push(urlImage[currentIndex])
      newUpdatedPicArray.push(pic[currentIndex]);
      setUpdatedArray(newUpdatedArray);
      setUpdatedPicArray(newUpdatedPicArray);
      console.log(updatedArray);
      console.log(newUpdatedPicArray);
    }
  }

  const input1 = (index) => {
    currentIndex = index;
    file.current.click();
  };

  const addPreview = () => {
    setImage([...image, 1]);
    setBlob([...blob, 1]);
    setUrlImage([...urlImage, 1]);
    setPic([...pic, 1]);
    setCount(count + 1);
    setTimeout(() => {
      previewBox.current.scrollLeft += 608;
    }, 100)
  };

  const popPreview = () => {
    if (!updatedArray.some(updated => updated == urlImage[urlImage.length - 1])
      && image[count - 1] !== 1 && typeof blob[count - 1] != 'object') pushNewUpdateToArray();
    previewBox.current.scrollLeft -= 608;
    image.pop();
    blob.pop();
    urlImage.pop();
    pic.pop();
    setCount(count - 1);
  }

  const pushImage = e => {
    //push updated array to new array
    pushNewUpdateToArray();
    // change specific index image; 
    let newImage = [...image];
    newImage[currentIndex] = 0;
    setImage(newImage);
    // change blob in specific index array 
    let newBlob = [...blob]
    newBlob[currentIndex] = e.target.files[0];
    setBlob(newBlob)
    // change urlImage in specific index array
    let imageUrl = URL.createObjectURL(e.target.files[0]);
    let newImageUrl = [...urlImage];
    newImageUrl[currentIndex] = imageUrl
    setUrlImage(newImageUrl);
    // set pics
    let pics = [...pic];
    new Compressor(e.target.files[0], {
      quality: 0.8,
      width: 300,
      mimeType: 'image/webp',
      success(result) {
        pics[currentIndex] = result;
        setPic(pics)
      }
    })
  };

  const update = async () => {
    let newBlob = blob.filter((file) => typeof file != 'number');
    let newPic = pic.filter(pic => !/\bhttp\b/.test(pic));
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", editProject._id);
    formData.append("title", title);
    formData.append("deskripsi", deskripsi);
    formData.append("github", github);
    formData.append('updated_at', new Date().toUTCString());
    formData.append("updated_src", updatedArray);
    formData.append("updated_pic", updatedPicArray);
    for(let i = 0; i < newBlob.length; i++) {
      formData.append("src", newBlob[i]);
      formData.append("pic", newPic[i]);
    }

    await fetch('http://localhost:3010/admin/update-project', {
      method: "POST",
      body: formData
    }).then( () => {
      dispatch(filterMyProject(editProject._id))
      dispatch(getProjects())
      setIsLoading(false)
      window.alert("Project Updated")
    }).catch(err => {
      console.log(err);
    })
  }

  const post = async () => {
    if (title && deskripsi && github && !blob.some((img) => { return img == 1 })) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("deskripsi", deskripsi);
      formData.append("github", github);
      formData.append('created_at', new Date().toUTCString());
      for (let i = 0; i < blob.length; i++) {
        formData.append("src", blob[i]);
        formData.append('pic', pic[i]);
      }


      await fetch("http://localhost:3010/admin/upload-project", {
        method: "POST",
        body: formData,
      })
        .then(data => data.json())
        .then((json) => {
          dispatch(addProjects({ _id: json._id, title, deskripsi, github, imageHeader: json.imageHeader }))
        })

      setTitle("");
      setDeskripsi("");
      setGithub("");
      setImage([1]);
      setBlob([1]);
      setCount(1);
      setPic([1]);
      setUrlImage([1]);
      setIsLoading(false);
      window.alert("project uploaded");
    } else {
      setIsLoading(false);
      window.alert("Field Tidak Boleh Kosong");
    }
  };

  const scrollLeft = () => {
    previewBox.current.scrollLeft -= 608;
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const scrollRight = () => {
    previewBox.current.scrollLeft += 608;
    if (count < image.length) {
      setCount(count + 1);
    }

  }

  const scrollPreviewObserver = () => {
    if (previewBox.current.scrollLeft >= (previewBox.current.scrollWidth - previewBox.current.offsetWidth) - count) {
      setIsMaxRight(true)
    } else {
      setIsMaxRight(false);
    }

    setIsNoLeft(previewBox.current.scrollLeft);
  }

  const deskripsiDeconstruction = (e) => {
    if(e.key === "Tab") {
      e.preventDefault();
      let deskripsiTextInput = deskripsi.split(" ");
      let deskripsiForHTML = deskripsi.split(" ");
      deskripsiForHTML.splice(deskripsiProject.current.selectionStart, 0, '<span className="mr-16"></span>');
      deskripsiTextInput.splice(deskripsiProject.current.selectionStart, 0, '        ');
      let joinTextModifiedArray = deskripsiTextInput.join(" ");
      let JoinHTMLModifiedArray = deskripsiForHTML.join(" ");
      setDeskripsi(joinTextModifiedArray);
      setDeskripsiHTML(JoinHTMLModifiedArray);
    } else if(e.key === "Enter") {
      let enterDeconstruction = deskripsi.split(" ");
      enterDeconstruction.splice(deskripsiProject.current.selectionStart, 0, '<br /><br />')
      setDeskripsiHTML(enterDeconstruction);
    }
  }

  const preview = image.map((i, index) =>
    <div key={index}>
      {image[index] === 1
        ? <div
          className="w-[600px] h-[300px] border-[2px] rounded-md border-dashed border-slate-300 
          flex flex-col gap-4 justify-center items-center cursor-pointer"
          onClick={() => { input1(index) }}
        >
          <FaPlusCircle className="text-4xl text-slate-300 " />
          <span className="text-lg text-slate-300 font-semibold ">
            Tambahkan Gambar {index + 1} Project
          </span>
        </div>
        :
        <div className="max-h-[300px] w-[600px] flex justify-center">
          <img
            onClick={() => { input1(index) }}
            src={urlImage[index]}
            className="w-auto max-h-[300px] max-w-[600px] h-auto cursor-pointer"
            alt=""
          />
        </div>
      }
    </div>
  );

  return (
    <motion.div
      ref={project}
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen pt-8"
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <span className="text-3xl font-pacifico font-bold text-slate-500">
          {editProject ? 'Edit' : 'Create'} Project
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
              <span className="absolute z-0 -right-14 cursor-pointer flex flex-col 
               gap-2">
                {
                  count < 6 && (
                    <BsFilePlusFill onClick={() => { addPreview() }} className="text-4xl font-semibold text-slate-600">
                    </BsFilePlusFill>
                  )
                }
                {
                  (image.length > 1 || count > 5) && (
                    <BsFileMinus onClick={() => { popPreview() }} className="text-4xl font-semibold text-slate-600">
                    </BsFileMinus>
                  )
                }
              </span>
            ) : (
              count < 6 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
                  onClick={() => { scrollRight() }} className="absolute -right-14 cursor-pointer">
                  <BsFillArrowRightSquareFill className="text-4xl font-semibold text-slate-600">
                  </BsFillArrowRightSquareFill>
                </motion.span>
              )
            )
          }

          {
            isNoLeft != 0 && (
              <span onClick={() => { scrollLeft(); }} className="absolute -left-14 cursor-pointer">
                <BsFillArrowLeftSquareFill className="text-4xl font-semibold text-slate-600"></BsFillArrowLeftSquareFill>
              </span>
            )
          }
          <div
            ref={previewBox}
            onScroll={() => { scrollPreviewObserver() }}
            className="w-[600px] h-auto relative flex flex-row gap-2 no-scrollbar overflow-x-auto items-center py-2 scroll-smooth"
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
            ref={deskripsiProject}
            onKeyDown={(e) => { deskripsiDeconstruction(e) }}
            onInput={e => {setDeskripsi(e.target.value) }}
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
        {
          editProject ? (
            <Buttons loading={isLoading} onClick={update} text="Update" />
          ) : (
            <Buttons loading={isLoading} onClick={post} text="Post" />
          )
        }
      </div>
    </motion.div>
  );
}

export default CreateProject;
