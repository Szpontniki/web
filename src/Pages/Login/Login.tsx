import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authentication/AuthContext';
import logo from '../../assets/login.png'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e: React.SubmitEvent<HTMLFormElement>)=> {
        e.preventDefault();

        if (username === 'szpont' && password === 'szpont1234') {
            login();
            navigate('/home', { replace: true});
        } else {
            alert('Incorrect');
        }
    }

    return (
        <>
        <main>
            <form onSubmit={handleLogin}>
                <div className='formContainer'>
                    <div className='formHeader'>
                    <img src={logo} alt='recent' />
                    </div>
                    <div className='inputContainer'>
                        <input 
                        type='text' 
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='username'
                        name='Username'
                        required
                        /> 
                    <input 
                        type='password' 
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                        name='Password'
                        required
                        minLength={8}
                        maxLength={10} /> <br />
                <button className="SubmitButton" type="submit">Log in</button>
                </div>
                </div>
            </form>
        </main>
        </>
    )
}