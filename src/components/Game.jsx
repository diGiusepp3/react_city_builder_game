import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

const Game = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Add light
        const light = new THREE.AmbientLight(0x404040); // Soft white light
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // Load OBJ file
        const objLoader = new OBJLoader();
        objLoader.load('/path/to/your/model.obj', (object) => {
            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xaaaaaa, // Optionally set a color
                        roughness: 0.5,
                        metalness: 0.5
                    });
                }
            });
            scene.add(object);

            // Position the object
            object.position.set(0, 0, 0);
            object.scale.set(1, 1, 1);
        });

        // Create a grid
        const gridSize = 24;
        const cellSize = 20; // Adjust size as needed

        const gridHelper = new THREE.GridHelper(gridSize * cellSize, gridSize, 0xffffff, 0x555555);
        scene.add(gridHelper);

        // Position the camera
        camera.position.z = 100;
        camera.position.y = 50;
        camera.lookAt(0, 0, 0);

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        return () => {
            window.removeEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        };
    }, []);

    return (
        <div className="game-container" style={{position: 'relative', width: '100%', height: '100vh'}}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Game;
