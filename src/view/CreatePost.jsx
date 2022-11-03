import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Buttons from "../components/Buttons";
import { FaPlusCircle } from "react-icons/fa";
import { EditorContent, useEditor } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "../components/MenuBar";
import { useDispatch } from "react-redux";
import { addPost, cleanInitEditPost, filterMyStupidPost, getPosts } from "../slice/postSlice";
import { useSelector } from "react-redux";
import axios from 'axios';

function CreatePost() {
  const file = useRef(0);
  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(0);
  const [blob, setBlob] = useState(null);
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editPost = useSelector(state => state.posts.editPost)
  const dispatch = useDispatch();
  var formData = new FormData();

  const initForm = () => {
    formData.append("file", image);
    formData.append("title", title);
    formData.append('subtitle', subtitle)
    formData.append("text", text);
    formData.append("tags", tags);
    formData.append('created_at', new Date().toUTCString());
  }

  const post = async () => {
    if (title && text && image && tags) {
      setIsLoading(true);
      initForm();
      await fetch("http://localhost:3010/admin/upload-post", {
        method: "POST",
        body: formData,
      })
        .then(payload => payload.json())
        .then((data) => {
          dispatch(addPost({ _id: data.id, title, subtitle, text, imageHeader: data.imageUrl, tags }))
        })

      setTitle("");
      setSubtitle("");
      editor.commands.setContent("");
      setBlob(null);
      setImage(null);
      setTags("");
      setIsLoading(false);
      window.alert("Upload Success");
    } else {
      window.alert('Field Tidak Boleh Kosong');
    }
  };

  const updatePost = () => {
    if (title && text && tags) {
      setIsLoading(true);
      const form = new FormData();
      form.append("id", id);
      form.append("file", image);
      form.append("title", title);
      form.append('subtitle', subtitle);
      form.append("text", text);
      form.append("tags", tags);
      form.append('created_at', new Date().toUTCString());
      axios.post("http://localhost:3010/admin/update-post", form)
        .then(() => {
          dispatch(filterMyStupidPost(id));
          dispatch(getPosts());
          setIsLoading(false);
          window.alert("Upload Success");
        }).catch((err) => {
          console.log(err);
        })
    } else {
      window.alert('Field Tidak Boleh Kosong');
    }

  };

  const editor = useEditor({
    content: editPost ? editPost.text : '',
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          style: "margin: auto",
        },
      }),
      Dropcursor,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      setText(html);
    }
  });

  const imageURL = () => {
    if (typeof image == "object") {
      let img = URL.createObjectURL(image);
      setBlob(img);
      return
    }
  };

  useEffect(() => {
    imageURL();
  }, [image]);

  useEffect(() => {
    if (editPost) {
      setId(editPost._id);
      setTitle(editPost.title);
      setSubtitle(editPost.subtitle);
      setText(editPost.text);
      setImage(editPost.imageHeader);
      setBlob(editPost.imageHeader);
      setTags(editPost.tags);
      return () => {
        dispatch(cleanInitEditPost())
      };
    }
  }, [])

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen flex gap-6 flex-col items-center py-10 "
    >
      <span className="text-4xl font-pacifico text-slate-500 mb-12">
        Create A Post
      </span>
      <div>
        <input
          onChange={(n) => setTitle(n.target.value)}
          value={title}
          type="text"
          className="lg:min-w-[700px] sm:min-w-[300px] w-auto px-4 py-3 border 
            border-slate-400 placeholder:text-start text-start rounded-md focus:outline-none text-sm 
            text-slate-500 font-bold"
          placeholder="Title"
        />
      </div>
      <div>
        <textarea
          onChange={(n) => setSubtitle(n.target.value)}
          value={subtitle}
          type="text"
          className="lg:min-w-[700px] sm:min-w-[300px] min-h-[180px] h-auto w-auto px-4 py-3 border 
            border-slate-400 placeholder:text-start text-start rounded-md focus:outline-none text-sm 
            text-slate-500 font-bold"
          placeholder="Subtitle"
        />
      </div>
      <input
        className="hidden"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
        ref={file}
        type="file"
      />
      {image ? (
        <img
          src={blob}
          onClick={() => {
            file.current.click();
          }}
          className="w-auto max-w-[700px] h-auto cursor-pointer"
          alt=""
        />
      ) : (
        <div
          className="w-auto h-32 min-w-[700px] border-[2px] rounded-md border-dashed border-slate-300
        flex flex-col gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            file.current.click();
          }}
        >
          <FaPlusCircle className="font-semibold text-slate-400 text-3xl" />
          <span className="text-base text-slate-400 text-md font-semibold">
            Tambahkan Header Image
          </span>
        </div>
      )}
      <div className="w-auto min-w-[700px]">
        <MenuBar editor={editor} />
        <div className="w-full">
          <EditorContent value={text} className="" editor={editor} />
        </div>
      </div>
      <div>
        <input
          onChange={(n) => setTags(n.target.value)}
          value={tags}
          type="text"
          className="min-w-[700px] w-auto px-4 py-3 border 
            border-slate-400 placeholder:text-center text-center rounded-md focus:outline-none text-sm 
            text-slate-500 font-bold"
          placeholder="insert tags with # prefix"
        />
      </div>
      <div>
        {
          editPost ? (
            <Buttons loading={isLoading} onClick={updatePost} text="Update" />
          ) : (
            <Buttons loading={isLoading} onClick={post} text="Post" />
          )
        }
      </div>
    </motion.div>
  );
}

export default CreatePost;
