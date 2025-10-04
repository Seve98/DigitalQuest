import { Link } from "react-router-dom";
export default function Header() {
    return (
        <>
        <header  className="header">
           <div className=" grid  h-screen lg:h-lvh justify-items-center align-center mb-20">
               <h1 data-aos="fade-up" className="text-4xl text-center lg:text-7xl mt-auto ">Benvenuto su DigitalQuest</h1>
               <h2 data-aos="fade-up" data-aos-delay="500" className=" text-2xl text-center lg:text-4xl mt-10 lg:mt-10 ">La piattaforma per i giochi digitali</h2>
               
               

    
           </div>
           </header>
             
        </>   
        
    );
}