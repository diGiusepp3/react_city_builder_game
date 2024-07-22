import React from 'react';

// Importing map images
import map1Thumbnail from '../images/maps/hills.png';
import map2Thumbnail from '../images/maps/mediumhills.png';
import map3Thumbnail from '../images/maps/rocks.png';
import map4Thumbnail from '../images/maps/desert.png';
import map5Thumbnail from '../images/maps/snowy-mountain-3d-model.jpg';
import map6Thumbnail from '../images/maps/alphes.png';
import map7Thumbnail from '../images/maps/provence.png';
import map8Thumbnail from '../images/maps/icelandic.png';
import map9Thumbnail from '../images/maps/mountainous.png';

const MapSelection = ({onMapSelect}) => {
    const maps = [
        {name: 'Hills', id: '1', path: '../models/maps/hills1.obj', thumbnail: map1Thumbnail},
        {name: 'Medium Hills', id: '2', path: '../models/maps/medium_hills.obj', thumbnail: map2Thumbnail},
        {name: 'Rocky', id: '3', path: '../models/maps/rocks.obj', thumbnail: map3Thumbnail},
        {name: 'Desert', id: '4', path: '../models/maps/desert.obj', thumbnail: map4Thumbnail},
        {name: 'Snowy Mountains', id: '5', path: '../models/maps/snowy-mountains.obj', thumbnail: map5Thumbnail},
        {name: 'Alphes', id: '6', path: '../models/maps/the_alphes.obj', thumbnail: map6Thumbnail},
        {name: 'Provence', id: '7', path: '../models/maps/provence.obj', thumbnail: map7Thumbnail},
        {name: 'Iceland', id: '8', path: '../models/maps/Icelandic_mountain.obj', thumbnail: map8Thumbnail},
        {name: 'Mountainous', id: '9', path: '../models/maps/mountainous.obj', thumbnail: map9Thumbnail},
    ];


    console.log("Rendering NewGame component");

    return (
        <div className="map-selection">
            <h2>Select a Map</h2>
            <div className="accordion-body">
                {maps.map((map, index) => (
                    <div className="accordion-item" key={index} onClick={() => onMapSelect(map)}>
                        <img src={map.thumbnail} alt={map.name}/>
                        <p>{map.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapSelection;

