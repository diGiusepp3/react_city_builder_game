import React, {useState} from 'react';
import MapSelection from './MapSelection';

const NewGame = () => {
    const [showMapSelection, setShowMapSelection] = useState(false);
    const [selectedMap, setSelectedMap] = useState(null); // State to hold the selected map

    const startNewGame = () => {
        setShowMapSelection(true); // Show the map selection when starting a new game
    };

    const handleMapSelect = (map) => {
        setSelectedMap(map); // Set the selected map
    };

    return (
        <div className="new-game">
            <h1>New Game</h1>
            <button onClick={startNewGame}>Select a starting map</button>
            {showMapSelection && <MapSelection onMapSelect={handleMapSelect}/>}
            {selectedMap && (
                <button onClick={() => console.log(`Playing with ${selectedMap.name}`)}>Play with this Map</button>
            )}
        </div>
    );
};

export default NewGame;
