import MetaBalls from './Metafolder/Metafolder'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex justify-center">
      <Navbar />
      <div className="absolute flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="font-urbanist md:text-7xl text-4xl text-black dark:text-white">Manage your task efficiently</h1>
      </div>
      <MetaBalls
        color="#ffffff"
        cursorBallColor="#ffffff"
        cursorBallSize={2}
        ballCount={15}
        animationSize={30}
        enableMouseInteraction={true}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1}
        speed={0.3}
        className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
      />

      
    </div>
  )
}

export default Hero