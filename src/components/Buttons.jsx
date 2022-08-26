import React from "react";
import { motion } from "framer-motion";
function Buttons({ sm, normal, md, lg, ...text }) {
  return (
    <>
      <motion.button
        className={`w-auto h-10 text-md flex items-center justify-center text-white font-semibold; 
        bg-blue-600 rounded-md drop-shadow-lg px-6`}
        whileTap={{ scale: 0.95 }}
        {...text}
      />
    </>
  );
}

Buttons.defaultProps = {
  sm: false,
  normal: true,
  md: false,
  lg: false,
};
export default Buttons;
