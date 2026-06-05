import {
  FaJava,
  FaReact,
  FaGithub,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiJavascript,
  SiHtml5,

  SiSpringboot,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiPostman,
  SiNetlify,
  SiIntellijidea,
  SiTailwindcss,
} from "react-icons/si";

import {motion} from 'framer-motion';
import { useState, useRef ,useEffect} from "react";
import { useMotionValue } from "framer-motion";


export default function Skills(){
   const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiSpringboot />, name: "Spring Boot" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiHtml5 />, name: "HTML5" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <SiNetlify />, name: "Netlify" },
    { icon: <SiIntellijidea />, name: "IntelliJ IDEA" },
  ];

  const repeated =[...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
  const el = sectionRef.current;
  if (!el) return;

  const io = new IntersectionObserver(
    ([entry]) => {
      setActive(
        entry.isIntersecting &&
        entry.intersectionRatio > 0.1
      );
    },
    {
      threshold: [0.1],
    }
  );

  io.observe(el);

  return () => io.disconnect();
}, []);

useEffect(() => {
  if (!active) return;

  const onWheel = (e) => {
    setDir(e.deltaY > 0 ? -1 : 1);
  };

  const onTouchStart = (e) => {
    touchY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    if (touchY.current == null) return;

    const delta =
      e.touches[0].clientY - touchY.current;

    setDir(delta > 0 ? 1 : -1);

    touchY.current = e.touches[0].clientY;
  };

  window.addEventListener("wheel", onWheel, {
    passive: true,
  });

  window.addEventListener("touchstart", onTouchStart, {
    passive: true,
  });

  window.addEventListener("touchmove", onTouchMove, {
    passive: true,
  });

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
  };
}, [active]);

useEffect(() => {
  let id;
  let last = performance.now();

  const SPEED = 80;

  const tick = (now) => {
    const dt = (now - last) / 1000;
    last = now;

    let next = x.get() + SPEED * dir * dt;

    const loop =
      trackRef.current?.scrollWidth / 2 || 0;

    if (loop) {
      if (next <= -loop) next += loop;
      if (next >= 0) next -= loop;
    }

    x.set(next);

    id = requestAnimationFrame(tick);
  };

  id = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(id);
}, [dir, x]);

  return(
    <section id="skills" 
    ref={sectionRef}
    className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      <div className ="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"/>

        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500"/>
      </div>
      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
      
      initial={{opacity:0,y:-30}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.6,delay:0.2}}>
        My Skills
      </motion.h2>

      <motion.p className='mt-2 mb-8 text-white/90 text-sm sm:text-lg text-center max-w-xs sm:max-w-2xl px-4 z-10'
      initial={{opacity:0,y:-10}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.5,delay:0.1}}
      >
        Modern technologies, frameworks, and tools I use to create scalable applications
      </motion.p>
      <div className="relative w-full overflow-hidden py" >

  <motion.div 
  ref={trackRef}
  className="flex gap-6 sm:gap-10 text-4xl sm:text-6xl text-[#1cd8d2]"
  style={{x,whiteSpace:"nowrap",willChange:"transform"}}>
    {repeated.map((s, i) => (
      <div
        key={i}
        className="flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[120px]"
        aria-label={s.name}
        title={s.name}
      >
        <span className="hover:scale-125 transition-transform duration-300">
          {s.icon}
        </span>

        <p className="text-[10px] sm:text-sm text-center">
          {s.name}
        </p>
      </div>
    ))}
  </motion.div>
</div>
  

    </section>
  )
}