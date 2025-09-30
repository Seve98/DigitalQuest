export default function Header() {
    return (
        <>
        <header className="header">
           <div className=" grid grid-cols-1 h-100 lg:h-lvh justify-items-center align-center mb-20">
               <h1 className="text-3xl text-center lg:text-7xl mt-auto ">Benvenuto su DigitalQuest</h1>
               <h2 className="header-subtitle text-2xl text-center lg:text-4xl mt-10 lg:mt-20 ">La piattaforma per i giochi digitali</h2>
               
           </div>
           </header>
             <video className=" background-video " autoPlay loop muted src="src/videobg1.mp4"></video>
        </>   
        
    );
}