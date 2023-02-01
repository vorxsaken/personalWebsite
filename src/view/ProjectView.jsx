import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, } from "react-icons/io"
import { useRef } from 'react'

export default function ProjectView() {
    const project = useSelector(state => state.projects.editProject)
    const carausel = useRef(null)

    const scrollLeft = () => {
        carausel.current.scrollLeft -= 350
    }

    const scrollRight = () => {
        carausel.current.scrollLeft += 350
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
            className="w-screen h-auto min-h-screen p-8 flex flex-col items-center gap-8 scroll-auto"
        >
            <div className='w-full h-auto flex flex-row items-start justify-center mt-12 gap-8'>
                <div className='w-auto h-auto flex flex-col justify-center gap-4'>
                    <div className='group w-[600px] h-[350px] relative overflow-hidden'>
                        <IoIosArrowDropleftCircle className='text-4xl text-white absolute cursor-pointer hover:scale-125 
                            transition-all duration-150 ease-in-out -left-10 top-40 active:scale-110 group-hover:left-7 drop-shadow-2xl
                            group-hover:opacity-100 opacity-0'
                            onClick={() => { scrollLeft() }}
                        />
                        <div ref={carausel} className='w-full h-full flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory rounded-lg no-scrollbar
                        scroll-smooth'>
                            {
                                project.imageHeader.src.map(image => (
                                    <div key={image.url} className='w-[600px] h-[350px] shrink-0 snap-center snap-always'>
                                        <img src={image.url} className='h-full w-full' />
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
                            <div className='w-auto p-2 h-auto rounded-md bg-slate-700 text-white font-bold'>
                                MongoDB
                            </div>
                            <div className='w-auto py-2 px-4 h-auto rounded-md bg-slate-700 text-white font-bold'>
                                ReactJS
                            </div>
                            <div className='w-auto p-2 h-auto rounded-md bg-slate-700 text-white font-bold'>
                                TailwindCSS
                            </div>
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
                <div className='w-[600px] flex flex-col justify-start gap-4'>
                    <h3 className='text-slate-700'>
                        {project.title}
                    </h3>
                    <p className='text-slate-600 text-md font-light text-justify'>
                        {project.deskripsi}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
