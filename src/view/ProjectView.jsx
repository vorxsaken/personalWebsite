import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, } from "react-icons/io"
import { useRef } from 'react'
import { useCustomeTitle } from '../utils'
import HTMLReactParser from 'html-react-parser'
import { useMediaQuery } from "../utils"

export default function ProjectView() {
    const project = useSelector(state => state.projects.viewProject)
    const carausel = useRef(null);
    const isSmall = useMediaQuery('(max-width: 427px)');
    const isMedium = useMediaQuery('(min-width: 428px)'); 
    const isBig = useMediaQuery(`(min-width: 1024px)`);
    useCustomeTitle(project.title);

    const scrollLeft = () => {
        carausel.current.scrollLeft -= 350
    }

    const scrollRight = () => {
        carausel.current.scrollLeft += 350
    }

    const projectTechStack = () => {
        let getTechStackArray = project.techStack.split("#").filter(tech => tech !== '' && tech !== ' ');
        return getTechStackArray;
    }


    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
            className="w-screen h-auto min-h-screen p-8 flex flex-col items-center gap-8 scroll-auto"
        >
            <div className='w-full h-auto flex flex-row flex-wrap items-start justify-center mt-12 gap-8'>
                <div className='w-auto h-auto flex flex-col justify-center gap-4'>
                    <div className={`group relative overflow-hidden ${isBig ? 'w-[600px] h-[350px]' : isMedium ? 'w-96 h-56' : isSmall && 'w-80 h-52'}`}>
                        <IoIosArrowDropleftCircle className='text-4xl text-white absolute cursor-pointer hover:scale-125 
                            transition-all duration-150 ease-in-out -left-10 top-40 active:scale-110 group-hover:left-7 drop-shadow-2xl
                            group-hover:opacity-100 opacity-0'
                            onClick={() => { scrollLeft() }}
                        />
                        <div ref={carausel} className='w-full h-full flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory rounded-lg no-scrollbar
                        scroll-smooth'>
                            {
                                project.imageHeader.src.map(image => (
                                    <div key={image.url} className={`shrink-0 snap-center snap-always ${isBig ? 'w-[600px] h-[350px]' : isMedium ? 'w-96 h-56' : isSmall && 'w-80 h-52'}`}>
                                        <img alt='images' src={image.url} className='h-full w-full' />
                                    </div>
                                ))
                            }
                        </div>
                        <IoIosArrowDroprightCircle className='text-4xl text-white absolute cursor-pointer hover:scale-125 
                            transition-all duration-150 ease-in-out active:scale-110 -right-10 top-40 group-hover:right-7 drop-shadow-2xl
                            group-hover:opacity-100 opacity-0 '
                            onClick={() => { scrollRight() }}
                        />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <span className='font-bold text-sm text-center'>Tech Stack :</span>
                        <div className='flex flex-row gap-2 justify-center'>
                            {
                                projectTechStack().map((techStack, index) => (
                                    <div key={index} className='w-auto p-2 h-auto rounded-md bg-slate-700 text-white font-bold'>
                                        {techStack}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='w-full h-10 mt-4 flex justify-center items-center'>
                        <a href={project.github} target="blank">
                            <div className='flex flex-row justify-center rounded-md p-3 bg-slate-100 align-center gap-2 hover:bg-slate-200 
                            transition-all duration-200 ease-in-out cursor-pointer'>
                                <FaGithub className='text-3xl' />
                                <span className='font-bold text-xl'>Github Link</span>
                            </div>
                        </a>

                    </div>
                </div>
                <div className='w-[600px] flex flex-col justify-center gap-4'>
                    <span className={`text-slate-700 font-extrabold ${isSmall ? 'text-2xl' : 'text-4xl'}`}>
                        {project.title}
                    </span>
                    <p className={`text-slate-600 text-md font-light ${isSmall ? 'text-xs' : 'text-base'}`}>
                        {HTMLReactParser(project.deskripsi)}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
