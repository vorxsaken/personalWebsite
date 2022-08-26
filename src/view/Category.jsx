import React from 'react'
import { motion } from "framer-motion";

function Category() {
  return (
    <motion.div initial={{y: 100, opacity: 0}} animate={{opacity: 1, y: 0}} 
    exit={{opacity: 0, y: -100}} transition={{duration: 0.3, ease: [0,.53,.32,1]}} 
    className='w-full h-auto min-h-screen p-10 flex justify-center items-center'>
      Category
    </motion.div>
  )
}

export default Category
