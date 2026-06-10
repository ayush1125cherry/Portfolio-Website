import{useEffect, useState ,useRef} from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/logo.png";
import { FiMenu } from "react-icons/fi";


export default function Navbar(){
  
  const [menuOpen ,setMenuOpen] = useState(false);
  const [visible ,setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);


  const lastScrollY = useRef(0);
  const timerId = useRef(null);
  
  useEffect(() => {
  const homeSection = document.querySelector("#home");
  const observer = new IntersectionObserver(
 ([entry]) => {
  if(entry.isIntersecting) {
    setForceVisible(true);
  setVisible(true);
  }else {
  setForceVisible(false);
  }
}, {threshold : 0.1}
  )
if (homeSection) observer.observe (homeSection);

return() => {
  if(homeSection) observer.unobserve(homeSection);
}
},[])


useEffect(() =>{
  const handleScroll = () =>{
    if(forceVisible){
      setVisible(true);
      return
    }

    const currentScrollY = window.scrollY;
    if(currentScrollY> lastScrollY.current){
      setVisible(false);
    }else{
      setVisible(true);

      if(timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() =>{
        setVisible(false);
      },3000)
    }

    lastScrollY.current=currentScrollY;
  }
  window.addEventListener("scroll",handleScroll,{passive:true})

  return() =>{
    window.removeEventListener("scroll",handleScroll)
    if(timerId.current)clearTimeout(timerId.current);

  }
},[forceVisible])
  
  return (
    <>
   <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
    visible ? "translate-y-0" : "-translate-y-full"
  }`}
>
  <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

    {/* Logo */}
    <div className="flex items-center flex-shrink-0">
      <img
        src={Logo}
        alt="Ayush Logo"
        className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
      />
    </div>

    {/* Center Menu */}
    <div className="absolute left-1/2 -translate-x-1/2">
      <button
        onClick={() => setMenuOpen(true)}
        className="text-white text-3xl sm:text-4xl"
      >
        <FiMenu />
      </button>
    </div>

    {/* Reach Out */}
    <a
      href="#contact"
      className="
        rounded-full
        bg-gradient-to-r
        from-pink-500
        to-blue-500
        text-white
        font-medium
        shadow-lg
        px-4 py-2
        sm:px-5 sm:py-2
        text-sm sm:text-base
        hover:opacity-90
        transition
      "
    >
      Reach Out
    </a>

  </div>
</nav>
    <OverlayMenu isOpen = {menuOpen} onClose ={() =>setMenuOpen(false)}/>
    </>
  )
}