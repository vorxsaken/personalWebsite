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
import MenuBar from "../components/MenuBar"

function CreatePost() {
  const file = useRef(0);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const post = async () => {
    if (title && text && image && tags) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("title", title);
      formData.append('subtitle', subtitle)
      formData.append("text", text);
      formData.append("tags", tags);

      await fetch("http://localhost:3010/admin/upload-post", {
        method: "POST",
        body: formData,
      });
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

  const editor = useEditor({
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
    },
  });

  const imageURL = () => {
    if (image != null) {
      let img = URL.createObjectURL(image);
      setBlob(img);
    }
  };

  useEffect(() => {
    imageURL();
  }, [image]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen flex gap-6 flex-col items-center py-10"
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
          className="lg:min-w-[700px] sm:min-w-[300px] h-auto min-h-[100px] w-auto px-4 py-3 border 
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
        <Buttons loading={isLoading} onClick={post} text="Post" />
      </div>
    </motion.div>
  );
}

export default CreatePost;
