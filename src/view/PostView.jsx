import React from 'react'
import { useSelector } from "react-redux"
import { useEffect } from "react"
import parse from 'html-react-parser'
import { motion } from "framer-motion"
import { getDate, hashtag, useCustomeTitle } from '../utils'
import { useMediaQuery } from "../utils"

function PostView() {
    const viewPost = useSelector((state) => state.posts.viewPost);
    const isSmall = useMediaQuery('(max-width: 428px)');
    useCustomeTitle(viewPost.title);

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
    }, [])

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
            className="w-[800px] h-auto min-h-screen p-8 flex flex-col items-center gap-8 scroll-auto"
        >
            <div id='name' className='w-full h-auto p-0 flex flex-col gap-1'>
                <span className='lg:text-3xl sm:text-xl font-bold text-slate-800'>
                    {viewPost.title}
                </span>
                <span className='text-xs font-normal text-gray-600'>
                    Posted At { getDate(viewPost.created_at) }
                </span>
                <span className='flex flex-row gap-2'>
                    {hashtag(viewPost.tags)}
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
            <div className={`text-start ${ isSmall ? 'text-xs' : 'text-base'}`}>
                {parse(viewPost.text)}
            </div>
        </motion.div>
    )
}

export default PostView