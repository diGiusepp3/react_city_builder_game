import React, {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'; // Importeer useNavigate
import {UserContext} from '../App'; // Importeer de UserContext

const Home = () => {
    const [gamesave, setGamesave] = useState(null);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext); // Gebruik de context om de huidige gebruiker op te halen
    const navigate = useNavigate(); // Gebruik useNavigate om te navigeren

    useEffect(() => {
        const fetchGameSave = async () => {
            try {
                const response = await fetch('https://projecten.webcrafters.be/city-builder-game/api/check-savegame.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username: user}), // Gebruik de huidige gebruiker
                });

                const result = await response.json();
                setGamesave(result.gamesave);
            } catch (error) {
                console.error('Error fetching game save:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameSave();
    }, [user]);

    const loadGame = () => {
        navigate('/game'); // Navigeer naar de game route
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="options-menu">
            <h1>Options Menu</h1>
            <ul className="d-flex flex-column">
                {gamesave ? (
                    <button onClick={loadGame}>Load Game</button>
                ) : (
                    <button onClick={() => console.log('Start New Game')}>Start New Game</button>
                )}
                <button onClick={() => console.log('Start New Game')}>Options</button>
            </ul>
        </div>
    );
};

export default Home;
