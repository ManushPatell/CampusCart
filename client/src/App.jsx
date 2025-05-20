import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Content from './components/Content'
import './App.css'
import './fonts/fonts.css';


function App() {

  return (
    <>
    <div className="scroll-smooth">
     <NavBar />
     <Hero/>
     <section id="content-section" 
     className="min-h-screen border-e-gray-950 bg-[#F5F1EA] p-8">
        <Content/>


     </section>
     {/* <ChevronDownIcon 
            onClick={handleScroll}
            className="w-12 h-12 text-cyan-100 animate-bounce cursor-pointer
             absolute bottom-8 left-1/2 transform -translate-x-1/2"
/> */}

     
 
     </div>
    </>
  )
}

export default App
