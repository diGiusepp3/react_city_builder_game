import React, {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../App';
import MapSelection from './MapSelection';

const Home = () => {
    const [gamesave, setGamesave] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMapSelection, setShowMapSelection] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGameSave = async () => {
            try {
                const response = await fetch('https://projecten.webcrafters.be/city-builder-game/api/check-savegame.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username: user}),
                });

                const result = await response.json();
                setGamesave(result.gamesave);
            } catch (error) {
                console.error('Error fetching game save:', error);
            } finally {
                setLoading(false); // Ensure loading is set to false here
            }
        };

        if (user) {
            fetchGameSave();
        } else {
            setLoading(false); // Set loading to false if user is null
        }
    }, [user]);

    const loadGame = () => {
        navigate('/game');
    };

    const register = async (username, password) => {
        try {
            const response = await fetch('https://projecten.webcrafters.be/city-builder-game/api/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const responseData = await response.text(); // Get the raw response data

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (!responseData) {
                throw new Error('Empty response data received');
            }

            const result = JSON.parse(responseData);
            if (result.status === 'success') { // Check for 'status' instead of 'success'
                // Registration successful
                console.log('Registration successful');
                setShowRegistrationForm(false);
                // Optionally, set user context or perform other actions upon successful registration
            } else {
                // Registration failed
                console.error('Registration failed:', result.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        register(username, password).then(() => {
            console.log('Registration attempt completed');
        }).catch((error) => {
            console.error('Registration attempt failed:', error);
        });
    };


    const startNewGame = () => {
        setShowRegistrationForm(true);
    };

    const handleMapSelect = (selectedMap) => {
        console.log('Selected Map:', selectedMap);
        setShowMapSelection(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="options-menu">
            <h1 className="text-center w-full">CityCrafters</h1>
            <div className="d-flex flex-column">
                {gamesave ? (
                    <button onClick={loadGame}>Load Game</button>
                ) : (
                    <button onClick={startNewGame}>Start New Game</button>
                )}
                <button onClick={() => console.log('Options clicked')}>Options</button>
            </div>
            {showMapSelection && <MapSelection onMapSelect={handleMapSelect}/>}
            {showRegistrationForm && (
                <form onSubmit={handleRegistrationSubmit}>
                    <div>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Register</button>
                </form>
            )}
        </div>
    );
};

export default Home;
