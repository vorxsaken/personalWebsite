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

    const scrollIntoView = (content) => {
        const element = document.getElementById(content);
        window.scrollTo(element.offsetLeft, element.offsetTop - 60);
    }

    const textWithId = () => {
        const element = document.getElementsByTagName('h6');
        const elementImg = document.getElementsByTagName('img');
        for(const y of elementImg){
            y.setAttribute("class", "pb-4")
        }
        for (const x of element) {
            x.setAttribute("id", x.innerText)
            x.setAttribute("class", "mb-6 relative before:w-full before:h-[3px] before:-bottom-1 before:absolute before:rounded-xl before:bg-gradient-to-r before:from-red-600")
        }
    }

    const tableOfContents = () => {
        var TOC = document.getElementsByTagName('h6');
        var content = []
        for (const x of TOC) {
            content.push(x.innerText)
        }
        return content
    }

    useEffect(() => {
        textWithId();
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
            className="w-[700px] h-auto min-h-screen p-8 flex flex-col items-center gap-8 scroll-auto"
        >
            <div id='name' className='w-full h-auto p-0 flex flex-col gap-1'>
                <span className='text-3xl font-bold text-slate-800'>
                    {viewPost.title}
                </span>
                <span className='text-xs font-normal text-gray-600'>
                    Posted At 10/10/2022
                </span>
                <span className='flex flex-row gap-2'>
                    {hashtag()}
                </span>
            </div>
            <span className='w-full flex flex-col item-start'>
                <img src={viewPost.imageHeader} className='w-auto max-w-[635px] h-auto' alt="" />
            </span>
            {tableOfContents().length > 0 && (
                <span className='w-full flex flex-col gap-2 justify-start'>
                    <span className='font-bold text-lg'>
                        Table Of Contents
                    </span>
                    <ul>
                        {tableOfContents().map(content => (
                            <li className='mb-1' key={content} onClick={() => { scrollIntoView(content) }}>
                                <span className='font-semibold text-sm w-auto relative text-slate-800 after:w-0 after:absolute after:-bottom-1
                        after:left-0 after:h-[2px] after:rounded-lg after:bg-fuchsia-600
                        hover:after:w-full after:transition-all after:duration-150 cursor-pointer'>
                                    {content}
                                </span>
                            </li>
                        ))}
                    </ul>
                </span>
            )}
            <div className='text-justify'>
                {HTMLReactParser(viewPost.text)}
            </div>
        </motion.div>
    )
}

export default PostView