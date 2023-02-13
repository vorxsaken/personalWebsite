import React from "react";
import { motion } from "framer-motion";
function Buttons({ sm, normal, md, lg, loading, text, onClick, textColor, bgColor }) {
  const load = <img alt="loading" src={require('../assets/img/Rolling-1s-200px.gif')} className="w-6"></img>
  return (
    <>
      <motion.button
        onClick={onClick}
        className={`w-auto h-10 text-md flex items-center justify-center font-extrabold; 
        rounded-md drop-shadow-lg px-6 ${ textColor } ${ bgColor }`}
        whileTap={{ scale: 0.95 }}
      >
        { loading ? load : text  }
      </motion.button>
    </>
  );
}

Buttons.defaultProps = {
  sm: false,
  normal: true,
  md: false,
  lg: false,
  loading: false,
  textColor: 'text-white',
  bgColor: 'bg-blue-500',
};
export default Buttons;
