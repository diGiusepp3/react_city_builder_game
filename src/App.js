import React from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import About from './routes/About'; // Voeg deze lijn toe als je een About route hebt
import Contact from './routes/Contact'; // Voeg deze lijn toe als je een Contact route hebt
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="App-wrapper">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-name">Web builder</h1>
                <p>* Made by Webcrafters *</p>
                <button onClick={() => handleNavigation('/login')}>Login</button>
                <button onClick={() => handleNavigation('/about')}>About</button>
                <button onClick={() => handleNavigation('/contact')}>Contact</button>
            </header>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/about" element={<About/>}/> {/* Voeg deze lijn toe als je een About route hebt */}
                <Route path="/contact" element={<Contact/>}/> {/* Voeg deze lijn toe als je een Contact route hebt */}
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App/>
        </Router>
    );
}

export default AppWrapper;
