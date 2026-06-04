import { useEffect,useRef } from "react"
export default function PaticlesBackground(){
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas = canvasRef.current;//Access actual canvas dom element
    const ctx = canvas.getContext("2d");//Draw in canvas
    let particles= [];
    const particleCnt =50;

    const colors =["rgba(255,255,255,0.7)"]; 

    //Tell the particle can appear randomly form anywhere
    class Particle{
      constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.radius = Math.random()*2+1;
        this.color =colors[Math.floor(Math.random()*colors.length)];
        this.speedX = (Math.random()-0.5)*0.5;
        this.speedY = (Math.random()-0.5)*0.5;
      }

      draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x<0) this.x=canvas.width; 
        if(this.x>canvas.width) this.x=canvas.width;
        if(this.y<0) this.y=canvas.width;
        if(this.y>canvas.width) this.y=canvas.width;

      this.draw();

      }
    }

    function createParticles(){
      particles =  [];
      for(let i=0;i<particleCnt;i++){
        particles.push(new Particle());
      }
    }

    function handleSize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }
    handleSize();

    window.addEventListener("resize",handleSize)
    let animationId;
    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach((p) => p.update());
      
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
     cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleSize);
    };

  },[]);

  return(
  <canvas
   ref= {canvasRef} 
   className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>
  )
}