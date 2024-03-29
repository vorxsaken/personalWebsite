import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { setState } from '../slice/loaderSlice';
import { filterMyStupidPost, initEditPost, initViewPost } from "../slice/postSlice";
import { useNavigate } from "react-router-dom"
import { useRef } from "react";
import { useMediaQuery, useCustomeTitle } from "../utils";

function Posts() {
  const access = useSelector((state) => state.user.adminAccess);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortedPost = [...posts].sort((a, b) => a.created_at - b.created_at);
  const postRef = useRef('');
  const isSmall = useMediaQuery('(max-width: 475px)');
  useCustomeTitle("Posts");

  useEffect(() => {
    return () => {
      document.documentElement.scrollTop = 0;
    }
  }, [])

  const filterPostList = (text) => {
    let postList = document.getElementsByClassName('post');
    for (const post of postList) {
      let textInside = post.childNodes[access ? 1 : 0].childNodes[1].childNodes[0].innerText;
      for (let i = 0; i < text.length; i++) {
        if (text[i].toLowerCase() !== textInside[i].toLowerCase()) {
          post.classList.add('hidden')
        } else if (text[i].toLowerCase() === textInside[i].toLowerCase()) {
          post.removeAttribute('hidden')
        }
      }
      if (text === '') {
        post.setAttribute('class', 'post relative hover:shadow-xl hover:scale-[1.01] transition-all duration-75');
      }
    }
  }

  const editPost = async (id) => {
    dispatch(setState(true));
    try {
      const getPost = await fetch(`http://localhost:3010/admin/get-post/${id}`);
      const data = await getPost.json();
      dispatch(initEditPost({ 
        _id: data._id, 
        title: data.title, 
        subtitle: data.subtitle, 
        text: data.text, 
        tags: data.tags, 
        imageHeader: data.imageHeader, 
        imagePic: data.imagePic, 
        created_at: data.created_at 
      }));
      setTimeout(() => {
        navigate("/create-post")
        dispatch(setState(false));
      }, 400)
    } catch (err) {
      dispatch(setState(false));
    }
  }

  const hapusPost = (id) => {
    dispatch(setState(true));
    fetch(`http://localhost:3010/admin/delete-post/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("_xvd")
      }
    }).then(() => {
      dispatch(filterMyStupidPost(id));
      dispatch(setState(false));
    })
  }

  const viewPost = async (id) => {
    dispatch(setState(true));
    try {
      const getPost = await fetch(`http://localhost:3010/admin/get-post/${id}`);
      const data = await getPost.json();
      dispatch(initViewPost({
         _id: data._id, 
         title: data.title, 
         subtitle: data.subtitle, 
         text: data.text, 
         tags: data.tags, 
         imageHeader: data.imageHeader, 
         created_at: data.created_at 
        }));
      setTimeout(() => {
        navigate("/post-view")
        dispatch(setState(false));
      }, 400)
    } catch (err) {
      dispatch(setState(false));
    }
  }

  var cards = sortedPost.map((post) => {
    return (
      <div className="post relative hover:shadow-xl hover:scale-[1.01] transition-all duration-75"
        key={post._id}>
        {access && (
          <span className="absolute -top-1 -left-1 flex flex-row gap-2">
            <motion.span
              onClick={() => { hapusPost(post._id) }}
              whileHover={{ scale: 1.06 }}
              className="p-3 rounded-full shadow-md flex justify-center items-center bg-slate-600 cursor-pointer"
            >
              <FaTrashAlt className="text-xs  text-white z-50"></FaTrashAlt>
            </motion.span>
            <motion.span
              onClick={() => { editPost(post._id) }}
              whileHover={{ scale: 1.06 }}
              className="p-3 rounded-full shadow-md flex justify-center items-center bg-slate-600 cursor-pointer"
            >
              <FaPencilAlt className="text-xs  text-white z-50"></FaPencilAlt>
            </motion.span>
          </span>
        )}
        <Card
          onClick={() => { viewPost(post._id) }}
          row={isSmall ? false : true}
          tags={post.tags}
          img={post.imagePic}
          title={post.title}
          des={post.subtitle}
          date={post.created_at}
        />
      </div>
    );
  });

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-auto min-h-screen p-8 flex flex-col items-center gap-8"
    >
      <span className="text-5xl text-slate-600 font-pacifico font-semibold">
        Posts
      </span>
      <input
        onChange={(e) => filterPostList(e.target.value)}
        type="text"
        className={`${isSmall ? 'w-72' : 'w-96'} p-5 h-6 focus:outline-none
        border-[1.5px] border-slate-600 rounded-md focus:border-slate-400 text-sm
        placeholder:text-slate-600 focus:placeholder:text-slate-400`}
        placeholder="Search ..."
      />
      <div ref={postRef} className="postList w-full h-auto flex flex-row flex-wrap justify-center gap-6">
        {posts.length > 0 ? (
          cards
        ) : (
          <span className="text-xl text-slate-400">Post Kosong</span>
        )}
      </div>
    </motion.div>
  );
}

export default Posts;
