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
    <div className="w-full py-2 px-2 flex flex-wrap justify-center flex-row gap-1">
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

export default MenuBar;