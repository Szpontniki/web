import './App.css'
import Draw from './Pages/Draw/Draw.tsx'
import Upload from './Pages/Upload/Upload.tsx'
import Home from './Pages/Home/Home.tsx'
import webLogo from './assets/webLogo.png'
import gitLogo from './assets/githubLogo.webp'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
  

      <header>
        <img src={webLogo} alt='Flashing Lights Logo' className='logo' />
      </header>
      <BrowserRouter>
        <nav> 
          <Link to = "/Draw" className='navLink'>Rysowanie</Link>
          <Link to = "/Upload" className='navLink'>Wgranie</Link>
        </nav>
        <Routes>
          <Route path='/' element={< Home / >} />
          <Route path='/Draw' element={<Draw / >} /> 
          <Route path='/Upload' element={<Upload / >} />
        </Routes>
      </BrowserRouter>

      <footer> 
        <h4>Made by Szpontniki 2026</h4>
        <a href="https://github.com/Szpontniki" target='_blank'>
          <img src={gitLogo} alt='IkonaGithub' className='githubButton' />
        </a> 
      </footer>
    </>
  )
}

export default App
