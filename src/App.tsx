import './App.css'
import Draw from './Pages/Draw/Draw.tsx'
import Upload from './Pages/Upload/Upload.tsx'
import Home from './Pages/Home/Home.tsx'
import Login from './Pages/Login/Login.tsx'
import webLogo from './assets/webLogo.webp'
import gitLogo from './assets/githubLogo.webp'
import Recent from './Pages/Recent/Recent.tsx'
import ProtectedRoute from './utils/authentication/ProtectedRoute.tsx'
import MenuUp from './assets/menuUp.webp'
import MenuDown from './assets/menuDown.webp'
import DrawLogo from './assets/draw.webp'
import RecentLogo from './assets/recent.webp'
import UploadLogo from './assets/upload.webp'
import { BrowserRouter, Link, Routes, Route, NavLink } from 'react-router-dom'
import { AuthProvider, useAuth } from './utils/authentication/AuthContext.tsx'
import { useState } from 'react'
import { bluetoothManager } from './utils'
import { useCallback } from 'react'

{/* TODO: remove later, when RFC 5 is implemented */}
{/* For more details see this: https://github.com/Szpontniki/rfcs/blob/master/rfcs/0005-connection-state.md */}
const BluetoothButton = () => {
	const { isAuthenticated } = useAuth();
	const connectBluetooth = useCallback(() => {
		bluetoothManager.connectBLE();
	}, []);

	if (!isAuthenticated) return null;
	
	return (
		<div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "10px" }}>
			<button onClick={connectBluetooth}>Bluetooth</button>
		</div>
	);
};

function App() {
	const [navOpen, setNavOpen] = useState(false);

	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<header>
						<Link to="/Home">
							<img src={webLogo} alt='Flashing Lights Logo' className='logo' />
						</Link>
					</header>
					<div className={`navContainer ${navOpen ? 'open' : ''}`}>
						<div className="navHeader">
							<button
								className="navToggle"
								onClick={() => setNavOpen(prev => !prev)}
							>
								<img
									src={navOpen ? MenuUp : MenuDown}
									alt={navOpen ? 'Zwiń menu' : 'Rozwiń menu'}
								/>
							</button>
						</div>

						<nav className="imageNav">
							<NavLink to="/Draw" className="imageNavLink">
								<img src={DrawLogo} alt="Rysowanie" />
							</NavLink>

							<NavLink to="/Upload" className="imageNavLink">
								<img src={UploadLogo} alt="Wgranie" />
							</NavLink>

							<NavLink to="/Recent" className="imageNavLink">
								<img src={RecentLogo} alt="Recent" />
							</NavLink>
						</nav>
					</div>

					<Routes>
						<Route path='/' element={< Login />} />
						<Route element={<ProtectedRoute />}>
							<Route path='/Home' element={< Home />} />
							<Route path='/Draw' element={<Draw />} />
							<Route path='/Upload' element={<Upload />} />
							<Route path='/Recent' element={<Recent />} />
						</Route>
					</Routes>

					<BluetoothButton />
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
