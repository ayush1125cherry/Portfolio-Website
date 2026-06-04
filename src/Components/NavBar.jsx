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
  className={`fixed top-0 left-0 w-full px-2 py-2 z-50 transition-transform duration-300 ${
    visible ? "translate-y-0" : "-translate-y-full"
  }`}
>
  <div className="relative flex items-center justify-between">
    
    {/* Logo */}
    <div className="flex items-center gap-2">
      <img src={Logo} alt="logo" className="w-10 h-10" />
      <span className="text-2xl font-bold text-white">
        Ayush
      </span>
    </div>

    {/* Center Menu Button */}
    <div className="absolute left-1/2 -translate-x-1/2">
      <button
        onClick={() => setMenuOpen(true)}
        className="text-white text-4xl"
      >
        <FiMenu />
      </button>
    </div>

    {/* Reach Out */}
    <a
      href="#contact"
      className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90"
    >
      Reach Out
    </a>
  </div>
</nav>

    <OverlayMenu isOpen = {menuOpen} onClose ={() =>setMenuOpen(false)}/>
    </>
  )
}