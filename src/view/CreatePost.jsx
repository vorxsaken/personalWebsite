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
import {
  TbBold,
  TbH1,
  TbH2,
  TbH3,
  TbH4,
  TbH5,
  TbH6,
  TbItalic,
  TbList,
  TbListNumbers,
  TbQuote,
  TbUnderline,
  TbPageBreak,
  TbCode,
  TbAlignCenter,
  TbAlignLeft,
  TbClearFormatting,
  TbAlignRight,
  TbClearAll,
} from "react-icons/tb";
import { BsFillFileCodeFill, BsFileEarmarkPpt, BsImage } from "react-icons/bs";
import { HiOutlineMinusSm } from "react-icons/hi";
import { BiUndo, BiRedo } from "react-icons/bi";
import "../style.scss";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Url");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="w-[700px] py-2 px-2 flex flex-wrap justify-center flex-row gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbBold></TbBold>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbItalic></TbItalic>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbUnderline></TbUnderline>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbCode></TbCode>
      </button>
      <button
        className="text-xl font-semibold text-slate-500"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <TbClearFormatting></TbClearFormatting>
      </button>
      <button
        className="text-xl font-semibold text-slate-500"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <TbClearAll></TbClearAll>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl text-slate-400"
        }
      >
        <BsFileEarmarkPpt></BsFileEarmarkPpt>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbH1></TbH1>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbH2></TbH2>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbH3></TbH3>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbH4></TbH4>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbH5></TbH5>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbH6></TbH6>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbAlignLeft></TbAlignLeft>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbAlignCenter></TbAlignCenter>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" })
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbAlignRight></TbAlignRight>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbList></TbList>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbListNumbers></TbListNumbers>
      </button>
      <button
        onClick={addImage}
        className="text-xl font-semibold text-slate-500"
      >
        <BsImage></BsImage>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <BsFillFileCodeFill></BsFillFileCodeFill>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "text-xl font-bold text-white bg-slate-600 rounded-sm p-[3px]"
            : "text-xl font-semibold text-slate-500"
        }
      >
        <TbQuote></TbQuote>
      </button>
      <button
        className="text-xl font-semibold text-slate-500"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <HiOutlineMinusSm></HiOutlineMinusSm>
      </button>
      <button
        className="text-xl font-semibold text-slate-500"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <TbPageBreak></TbPageBreak>
      </button>
      <button
        className="text-xl font-semibold text-slate-500"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <BiUndo></BiUndo>
      </button>
      <button
        className="text-xl font-semibold text-slate-500"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <BiRedo></BiRedo>
      </button>
    </div>
  );
};

function CreatePost() {
  const file = useRef(0);
  const [title, setTitle] = useState(null);
  const [value, setValue] = useState(null);
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);

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
      setValue(html);
    },
  });

  const imageURL = () => {
    if(image != null){
        let img = URL.createObjectURL(image);
        setBlob(img);
    }
  }

  useEffect(() => {
    imageURL();
  }, [image])

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
          type="text"
          className="min-w-[700px] w-auto px-4 py-3 border 
            border-slate-400 placeholder:text-center text-center rounded-md focus:outline-none text-sm 
            text-slate-500 font-bold"
          placeholder="Title"
        />
      </div>
      <input className="hidden" onChange={(e) => {setImage(e.target.files[0])}} ref={file} type="file" />
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
          <EditorContent className="" editor={editor} />
        </div>
      </div>
      <div>
        <Buttons>Post</Buttons>
      </div>
    </motion.div>
  );
}

export default CreatePost;
