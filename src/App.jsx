import React, {useState, createContext, useContext} from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation} from 'react-router-dom';
import logo from './logo.png';
import Home from './components/Home';
import Game from './components/Game'; // Importeer de Game component
import {About, Contact, Login} from './components/';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const UserContext = createContext();

const Layout = () => {
    const location = useLocation();
    const {isLoggedIn} = useContext(UserContext); // Gebruik de context om de inlogstatus op te halen

    return (
        <div className="App">
            <header className="App-header">
                {!isLoggedIn && <img src={logo} className="App-logo" alt="logo" id="startLogo"/>}
                {!isLoggedIn && (
                    <nav id="topNav">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>
                )}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </header>
        </div>
    );
};

function App() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            <Router>
                <Layout/>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
