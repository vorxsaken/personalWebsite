import React from "react";
import { motion } from "framer-motion";
function Buttons({ sm, normal, md, lg, loading, text, onClick }) {
  const load = <img src={require('../assets/img/Rolling-1s-200px.gif')} className="w-6"></img>
  return (
    <>
      <motion.button
        onClick={onClick}
        className={`w-auto h-10 text-md flex items-center justify-center text-white font-semibold; 
        bg-blue-600 rounded-md drop-shadow-lg px-6`}
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
  loading: false
};
export default Buttons;
