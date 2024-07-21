import React, {useEffect, useRef} from 'react';

const Game = () => {
    let topNav = document.getElementById("topNav");
    if (topNav) {
        topNav.style.display = 'none';
    }
    let startLogo = document.getElementById("startLogo");
    if (startLogo) {
        startLogo.style.display = 'none';
    }
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const gridSize = 24;
        const cellSize = canvas.width / gridSize;

        // Teken de achtergrond
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Teken het raster
        ctx.strokeStyle = 'white';
        ctx.setLineDash([5, 5]); // Stippellijn

        for (let x = 0; x <= canvas.width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y <= canvas.height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }, []);

    return (
        <div className="game-container" style={{position: 'relative', width: '100%', height: '100vh'}}>
            <canvas ref={canvasRef} width={600} height={600} style={{display: 'block', margin: 'auto'}}></canvas>
        </div>
    );
};

export default Game;
