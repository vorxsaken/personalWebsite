import React from 'react'
import {FaInstagram, FaTelegram, FaDiscord} from 'react-icons/fa'
function Footer() {
  return (
    <div className='w-full h-auto flex mt-7 flex-col px-8 py-10 border-t-[1.3px] border-slate-300 justify-center'>
        <div className='flex flex-row justify-center gap-6'>
            <FaTelegram className='text-blue-400 hover:text-blue-600 cursor-pointer text-3xl'></FaTelegram>
            <FaInstagram className='text-pink-400 hover:text-pink-600 cursor-pointer text-3xl'></FaInstagram>
            <FaDiscord className='text-blue-400 hover:text-blue-600 cursor-pointer text-3xl'></FaDiscord>
        </div>
        <div className='flex flex-col py-4 text-center items-center relative md:text-base text-xs gap-2'>
            <div>Made with <span className='text-slate-800 mr-[4px]'>React.js</span>
             and <span className='text-slate-800 mr-[4px]'>TailwindCss</span> 
             Hosted in <span className='text-slate-800 mr-[4px]'>Github</span></div>
            <div className='text-xs font-light'>Copyright 🍣 2022 Vorxsaken</div>
        </div>
    </div>
  )
}

export default Footer