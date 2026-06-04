import ParticlesBackground from "../Components/ParticlesBackground";
import { motion } from "framer-motion";
import {  FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
import { SiLeetcode } from "react-icons/si";
import avatorme2 from "../assets/avatorme2.png";

export default function Home() {

  const roles = useMemo(
  () => ["Web Developer", "Java Full Stack","Dsa Java"],
  []
);

const socials = [
  {
    Icon: MdEmail,
    label: "Email",
    href: "mailto:ayushrawat3243@gmail.com",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayush-rawat-java",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/ayush1125cherry",
  },
  {
    Icon: SiLeetcode,
    label: "LeetCode",
    href: "https://leetcode.com/u/ayush_rwt007/",
  },
];
  
const glowVariants = {
  initial: {
    scale: 1,y: 0,filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },

  hover: {
    scale: 1.2,y: -3,filter:"drop-shadow(0 0 8px rgba(13,88,284,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: {type: "spring",stiffness: 300,damping: 15,},
  },

  tap: {scale: 0.95,y: 0,transition: {duration: 0.08,},
},
};

const [index, setIndex] = useState(0);
const [subIndex, setSubIndex] = useState(0);
const [deleting, setDeleting] = useState(false);

useEffect(() => {
  const current = roles[index];

  const timeout = setTimeout(() => {
    if (!deleting && subIndex < current.length) {
      setSubIndex((v) => v + 1);
    } else if (!deleting && subIndex === current.length) {
      setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && subIndex > 0) {
      setSubIndex((v) => v - 1);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((p) => (p + 1) % roles.length);
    }
  }, deleting ? 40 : 60);

  return () => clearTimeout(timeout);
}, [subIndex, index, deleting, roles]);


  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticlesBackground />

      <div className="absolute inset-0">
        <div
          className="
          absolute -top-32 -left-32
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-500px max-h-500px
          rounded-full
          bg-linear-to-r
          from-[#302b63]
          via-[#00bf8f]
          to-[#1cd8d2]
          opacity-30 sm:opacity-20 md:opacity-10
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse
        "
        />

        <div
          className="
          absolute bottom-0 right-0
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-500px max-h-500px
          rounded-full
          bg-linear-to-r
          from-[#302b63]
          via-[#00bf8f]
          to-[#1cd8d2]
          opacity-30 sm:opacity-20 md:opacity-10
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse
        "
        />
      </div>
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
  <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
    <div className="w-full lg:pr-24 mx-auto max-w-48rem">

       <motion.div
      className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span>{roles[index].substring(0, subIndex)}</span>

      <span
        className="inline-block w-2px ml-1 bg-white animate-pulse align-middle"
        style={{ height: "1em" }}
      />
    </motion.div>


    <motion.h1
  className="
     text-3xl
    sm:text-4xl
    md:text-5xl
    lg:text-7xl
    font-bold text-transparent bg-clip-text
    bg-linear-to-r
    from-[#1cd8d2]
    via-[#00bf8f]
    to-[#302b63]
    drop-shadow-lg
  "
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  Hello, I'm
  <br />

  <span
    className="
      text-white
      font-bold
      text-5xl sm:text-6xl md:text-7xl lg:text-8xl
      lg:whitespace-nowrap
    "
  >
    Ayush Rawat
  </span>
</motion.h1>

<motion.p
  className="
    mt-6
    text-base sm:text-lg md:text-xl
    text-gray-300
    max-w-2xl
    mx-auto lg:mx-0
  "
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
>
Full Stack Developer passionate about building modern web applications with React, Spring Boot, and PostgreSQL. Experienced in developing scalable solutions, RESTful APIs, and real-world projects that solve practical problems

</motion.p>

<motion.div
  className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8, duration: 0.8 }}
>
  <a
    href="#projects"
    className="
      px-6 py-3 rounded-full font-medium text-lg text-white
      bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
      shadow-lg hover:scale-105 transition-all duration-300
    "
  >
    View My Work
  </a>

  <a
    href="/Resume.pdf"
    download
    className="
      px-6 py-3 rounded-full text-lg font-medium text-black
      bg-white hover:bg-gray-200
      shadow-lg hover:scale-105 transition-all duration-300
    "
  >
    My Resume
  </a>
</motion.div>

<div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
  {socials.map(({ Icon, label, href }) => (
    <motion.a
      href={href}
      key={label}
      target="_blank"
      aria-label={label}
      rel="noopener noreferrer"
      variants={glowVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className="text-gray-300"
    >
      <Icon />
    </motion.a>
  ))}
</div>

    </div>

  </div>
  <div className="relative hidden lg:block">
  <div
    className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
    style={{
      right: "10px",
      width: "min(22vw, 410px)",
      height: "min(40vw, 760px)",
      borderRadius: "50%",
      filter: "blur(38px)",
      opacity: 0.32,
      background:
        "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
    }}
  />
  <motion.img
  src={avatorme2}
  alt="Ayush Rawat"
  className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
  style={{
    right: "-30px",
    width: "min(45vw, 788px)",
    maxHeight: "90vh",
  }}
  initial={{ opacity: 0, y: 40, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.8 }}
/>
</div>

</div>
    </section>
  );
}