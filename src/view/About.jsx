import React, { useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Avatar from '../components/Avatar'
import { useRef } from 'react'
import { useState } from 'react'
import { DiReact, DiJavascript, DiNodejs } from "react-icons/di"
import { FaVuejs } from "react-icons/fa"
import { SiTailwindcss, SiVuetify, SiCss3 } from "react-icons/si"
import { useMediaQuery, useCustomeTitle } from '../utils'

const titleWord = "Vorxsaken"
const subtitleWord = `To be Honest i dont know what to put in this page since its already in the home page, so in here i'll just put my strength, you can click image below to see it.`

const listContainerVariants = {
  init: {},
  enter: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.4
    }
  }
}

const listVariants = {
  init: {
    x: -50,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
}

const textContainerVariant = {
  init: {},
  enter: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.5,
    }
  }
}

const textVariant = {
  init: {
    y: -10,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween"
    }
  }
}

const drawPathVariant = {
  hidden: {
    pathLength: 0,
  },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      transition: {
        pathLength: {
          delay,
          type: "spring",
          duration: 1,
          bounce: 0
        }
      }
    }
  }
}

function About() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isSmall = useMediaQuery('(max-width: 475px)');
  useCustomeTitle("About");
  
  useEffect(() => {
    return () => {
      document.documentElement.scrollTop = 0;
    }
  }, [])

  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.3, ease: [0, .53, .32, 1] }}
      ref={ref}
      className={`w-full min-h-screen flex flex-col items-center`}>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`${isSmall ? 'w-[320px] mt-32' : 'w-[400px] mt-32'} relative flex flex-col justify-center items-center gap-6 `}>
        <motion.span variants={textContainerVariant} initial="init" animate="enter" className='flex flex-row'>
          {titleWord.split("").map((word, index) => (
            <motion.span variants={textVariant} key={index} className='font-bold text-slate-700 text-4xl text-center'>{word}</motion.span>
          ))}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", duration: 0.7 }}
          className='text-slate-700 font-light text-justify text-sm break-word'>
          {subtitleWord}
        </motion.span>
        <motion.div whileHover={{ scale: 1.1 }} className=" hidden top-32 cursor-pointer mt-6 display-none">
          <Avatar />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          layout
          data-isopen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="profile absolute top-32 cursor-pointer mt-6">
          <AnimatePresence exitBeforeEnter>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-full h-full rounded-lg bg-slate-700 absolute z-50 '>
                <motion.div
                  initial="init"
                  animate="enter"
                  variants={listContainerVariants}
                  className={`w-full h-full flex flex-col flex-wrap justify-start items-start gap-2 text-white pt-6 ${isSmall ? 'pl-5' : 'pl-[4.5rem]'}`}>
                  <motion.div variants={listVariants} className='flex flex-row justify-start items-centers w-auto'>
                    <div className={`flex flex-row justify-start items-center gap-2 ${isSmall ? 'w-[105px]' : 'w-[130px]'}`}>
                      <DiReact className='profile-icon' />
                      <span>ReactJS</span>
                    </div>
                    <motion.svg initial="hidden" animate="visible" width="25" height="45" viewBox="0 0 120 80">
                      <motion.path
                      fill='none'
                      variants={drawPathVariant}
                      custom={0.1}
                      stroke='rgb(255, 255, 255)'
                      strokeWidth="10"
                      d='m 27 43 l 20 22 l 40 -46'/>
                    </motion.svg>
                  </motion.div>
                  <motion.div variants={listVariants} className='flex flex-row justify-start items-center w-auto'>
                    <div className={`flex flex-row justify-start items-center gap-2 ${isSmall ? 'w-[105px]' : 'w-[130px]'}`}>
                      <DiJavascript className='profile-icon' />
                      <span>Javascript</span>
                    </div>
                    <motion.svg initial="hidden" animate="visible" width="25" height="45" viewBox="0 0 120 80">
                      <motion.path
                      fill='none'
                      variants={drawPathVariant}
                      custom={1}
                      stroke='rgb(255, 255, 255)'
                      strokeWidth="10"
                      d='m 27 43 l 20 22 l 40 -46'/>
                    </motion.svg>
                  </motion.div>
                  <motion.div variants={listVariants} className='flex flex-row justify-start items-center w-auto'>
                    <div className={`flex flex-row justify-start items-center gap-2 ${isSmall ? 'w-[105px]' : 'w-[130px]'}`}>
                      <DiNodejs className='profile-icon' />
                      <span>NodeJS</span>
                    </div>
                    <motion.svg initial="hidden" animate="visible" width="25" height="45" viewBox="0 0 120 80">
                      <motion.path
                      fill='none'
                      variants={drawPathVariant}
                      custom={2}
                      stroke='rgb(255, 255, 255)'
                      strokeWidth="10"
                      d='m 27 43 l 20 22 l 40 -46'/>
                    </motion.svg>
                  </motion.div>
                  <motion.div variants={listVariants} className='flex flex-row justify-start items-center w-auto'>
                    <div className={`flex flex-row justify-start items-center gap-2 ${isSmall ? 'w-[105px]' : 'w-[130px]'}`}>
                      <FaVuejs className='profile-icon' />
                      <span>VueJS</span>
                    </div>
                    <motion.svg initial="hidden" animate="visible" width="25" height="45" viewBox="0 0 120 80">
                      <motion.path
                      fill='none'
                      variants={drawPathVariant}
                      custom={3}
                      stroke='rgb(255, 255, 255)'
                      strokeWidth="10"
                      d='m 27 43 l 20 22 l 40 -46'/>
                    </motion.svg>
                  </motion.div>
                  <motion.div variants={listVariants} className='flex flex-row justify-start items-center w-auto'>
                    <div className={`flex flex-row justify-start items-center gap-2 ${isSmall ? 'w-[115px]' : 'w-[150px]'}`}>
                      <SiTailwindcss className='profile-icon' />
                      <span>TailwindCSS</span>
                    </div>
                    <motion.svg initial="hidden" animate="visible" width="25" height="45" viewBox="0 0 120 80">
                      <motion.path
                      fill='none'
                      variants={drawPathVariant}
                      custom={4}
                      stroke='rgb(255, 255, 255)'
                      strokeWidth="10"
                      d='m 27 43 l 20 22 l 40 -46'/>
                    </motion.svg>
                  </motion.div>
                  <motion.div variants={listVariants} className='flex flex-row justify-start items-center w-auto'>
                    <div className={`flex flex-row justify-start items-center gap-2 ${isSmall ? 'w-[115px]' : 'w-[150px]'}`}>
                      <SiVuetify className='profile-icon' />
                      <span>Vuetify</span>
                    </div>
                    <motion.svg initial="hidden" animate="visible" width="25" height="45" viewBox="0 0 120 80">
                      <motion.path
                      fill='none'
                      variants={drawPathVariant}
                      custom={5}
                      stroke='rgb(255, 255, 255)'
                      strokeWidth="10"
                      d='m 27 43 l 20 22 l 40 -46'/>
                    </motion.svg>
                  </motion.div>
                  <motion.div variants={listVariants} className='flex flex-row justify-start items-center w-auto'>
                    <div className={`flex flex-row justify-start items-center gap-2 ${isSmall ? 'w-[115px]' : 'w-[150px]'}`}>
                      <SiCss3 className='profile-icon' />
                      <span>Css</span>
                    </div>
                    <motion.svg initial="hidden" animate="visible" width="25" height="45" viewBox="0 0 120 80">
                      <motion.path
                      fill='none'
                      variants={drawPathVariant}
                      custom={6}
                      stroke='rgb(255, 255, 255)'
                      strokeWidth="10"
                      d='m 27 43 l 20 22 l 40 -46'/>
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <Avatar auto={true} isRounded={false} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default About
