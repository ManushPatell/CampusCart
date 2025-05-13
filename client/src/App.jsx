import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Content from './components/content'
import './App.css'
import './fonts/fonts.css';


function App() {

  return (
    <>
    <div className="scroll-smooth">
     <NavBar/>
     <Hero/>
     <section id="content-section" 
     className="min-h-screen  border-10">
        <Content/>


     </section>
     

     
 
     </div>
    </>
  )
}

export default App
