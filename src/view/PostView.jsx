import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { cleanInitEditPost } from "../slice/postSlice"
import HTMLReactParser from 'html-react-parser'
import { motion } from "framer-motion"

function PostView() {
    const viewPost = useSelector((state) => state.posts.editPost);
    const dispatch = useDispatch()
    
    const hashtag = () => {
        if (viewPost.tags) {
            var tag = viewPost.tags.split('#').filter(p => p != '' && p != ' ');
            if (tag.length > 2) {
                tag = tag.slice(0, 2)
            }
            let hashTag = tag.map((t, index) => (
                <span key={index} className='rounded-md px-2 bg-gray-200 text-slate-800 text-xs '>#{t}</span>
            ))

            return hashTag;
        }
    }

    useEffect(() => {
        return () => {
            dispatch(cleanInitEditPost())
        }
    }, [])

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
            className="w-[700px] h-auto min-h-screen p-8 flex flex-col items-center gap-8"
        >
            <div className='w-full h-auto p-0 flex flex-col gap-1'>
                <span className='text-3xl font-bold text-slate-800'>
                    {viewPost.title}
                </span>
                <span className='text-xs'>
                    {viewPost.subtitle}
                </span>
                <span className='text-xs font-normal text-gray-600 mt-2'>
                    Posted At 10/10/2022
                </span>
                <span className='flex flex-row gap-2'>
                    { hashtag() }
                </span>
            </div>
            <span className='w-full flex flex-col item-start'>
                <img src={viewPost.imageHeader} className='w-auto max-w-[635px] h-auto' alt="" />
            </span>
            <div className='text-justify'>
                {HTMLReactParser(viewPost.text)}
            </div>
        </motion.div>
    )
}

export default PostView