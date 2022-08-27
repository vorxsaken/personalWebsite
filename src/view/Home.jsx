import React from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Buttons from "../components/Buttons";

function Home() {
  const num = [1, 2, 3, 4];
  const cards = num.map((n, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
    >
      <Card
        img={"jasad"}
        title="ini adalah title yang besar besar besar besar besar"
        des="An Android app that allows you to scan Japanese words from a picture and search for its 
        meaning from a dictionary."
      />
    </motion.div>
  ));

  const projects = num.map((n) => (
    <motion.div
      key={n}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
    >
      <Card
        img={"jasad"}
        row={true}
        title="ini adalah title yang besar besar besar besar besar"
        des="An Android app that allows you to scan Japanese words from a picture and search for its 
        meaning from a dictionary."
      />
    </motion.div>
  ));

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0.53, 0.32, 1] }}
      className="w-full h-full"
    >
      {/* profil container */}
      <div className="w-full h-full">
        {/* avatar container */}
        <div
          className="w-full h-[80vh] flex justify-center items-center gap-3 bg-white 
          bg-opacity-[1%]"
        >
          {/* avatar */}
          <div
            className="flex flex-col flex-grow-0 justify-center items-center px-8 pb-10 gap-3 bg-white rounded-3xl
           bg-opacity-[60%] backdrop-blur-md"
          >
            <div
              className="w-[220px] h-[220px] mt-10 border-4 border-white rounded-full bg-black 
            overflow-hidden relative drop-shadow-lg bg-cover bg-right"
              style={{
                backgroundImage: `url(${require("../assets/img/1.jpg")})`,
              }}
            ></div>
            <p className="text-3xl font-bold text-gray-500 max-w-lg text-center">
              Hi There, Iam <span className="text-slate-800">Vorxsaken</span>
            </p>
            <p className="text-sm font-normal text-center text-black max-w-md">
              Iam a self taught web/software developer, I created this website
              to express my thoughts or just to show the projects that I have
              made. I hope you enjoy the content of this website or find
              something useful.
            </p>
          </div>
        </div>
      </div>

      {/* content posts list summary */}
      <div className="w-full h-auto flex flex-col gap-2 bg-white mt-4">
        <p className="text-center font-bold text-2xl text-slate-600 mt-10 relative">
          <span
            className="before:w-32 before:h-[3px] before:-bottom-1 before:absolute 
          before:rounded-xl before:bg-gradient-to-r before:from-red-400"
          >
            Recent Posts
          </span>
        </p>
        <div className="px-4 py-4 flex flex-row flex-wrap gap-6 items-center justify-center">
          {cards}
        </div>
        <div className="py-4 flex flex-row items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <Buttons>More ..</Buttons>
          </motion.span>
        </div>
      </div>

      {/* constent project list summary */}
      <div className="w-full h-auto flex flex-col gap-2 bg-white">
        <p className="text-center font-bold text-2xl text-slate-600 mt-10 relative">
          <span
            className="before:w-32 before:h-[3px] before:-bottom-1 before:absolute 
          before:rounded-xl before:bg-gradient-to-r before:from-red-400"
          >
            Recent Posts
          </span>
        </p>
        <div className="px-4 py-4 flex flex-row flex-wrap gap-6 items-center justify-center">
          {projects}
        </div>
        <div className="py-4 flex flex-row items-center justify-center">
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <Buttons>More ..</Buttons>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
