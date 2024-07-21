import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../App'; // Importeer de UserContext

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {setUser, setIsLoggedIn} = useContext(UserContext); // Gebruik de context om de gebruikersinformatie op te slaan
    const navigate = useNavigate(); // Gebruik useNavigate om te navigeren

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://projecten.webcrafters.be/city-builder-game/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            const text = await response.text();
            console.log('Response Text:', text);

            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                result = {status: 'error', message: 'Invalid server response.'};
            }

            setMessage(result.message);

            if (result.status === 'success') {
                setUser(username); // Sla de gebruikersinformatie op
                setIsLoggedIn(true); // Update de inlogstatus
                let topNav = document.getElementById("topNav");
                if (topNav) {
                    topNav.style.display = 'none';
                }
                let startLogo = document.getElementById("startLogo");
                if (startLogo) {
                    startLogo.style.display = 'none';
                }
                navigate('/'); // Navigeer naar de homepagina

            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group py-2">
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
