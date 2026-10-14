import './App.css'
import Draw from './Pages/Draw/Draw.tsx'
import Upload from './Pages/Upload/Upload.tsx'
import Home from './Pages/Home/Home.tsx'
import Login from './Pages/Login/Login.tsx'
import webLogo from './assets/webLogo.png'
import gitLogo from './assets/githubLogo.webp'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { useCallback } from 'react'
import { bluetoothManager } from './utils'

function App() {
  const connectBluetooth = useCallback(() => {
    bluetoothManager.connectBLE();
  }, []);

  return (
    <>
      <header>
        <img src={webLogo} alt='Flashing Lights Logo' className='logo' />
      </header>
      <AuthProvider>
        <BrowserRouter>
          <nav> 
            <Link to = "/Draw" className='navLink'>Rysowanie</Link>
            <Link to = "/Upload" className='navLink'>Wgranie</Link>
          </nav>

          {/* TODO: remove later */}
          <div style={{ width: "100% ", display: "flex", justifyContent: "center", padding: "10px" }}>
            <button onClick={connectBluetooth}>Bluetooth</button>
          </div>

          <Routes>
            <Route path='/' element={< Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/Home' element={< Home />} />
              <Route path='/Draw' element={<Draw />} />
              <Route path='/Upload' element={<Upload />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
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
