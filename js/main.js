import { setupThreeJS } from './three-setup.js';
import { setupPhysicsWorld } from './physics.js';
import { setupEffects } from './effects.js';
import { createTrack } from './track.js';
import { createCar } from './car.js';
import { createTrees } from './trees.js';
import { createRocks } from './rocks.js';
import { createLake } from './lake.js';
import { createAnimals } from './animal.js';
import { setupInputs, updateDrive } from './controls.js';
import { updateGameLogic } from './gameLogic.js';
import { state, gameState } from './state.js';

export function init() {
    // UI refs
    state.timeDisplay = document.getElementById('time-value');
    state.speedDisplay = document.getElementById('speed-value');
    state.lapDisplay = document.getElementById('lap-current');
    state.lapMsg = document.getElementById('lap-message');
    state.driftIndicator = document.getElementById('drift-indicator');

    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('start-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('start-screen').style.display = 'none';
            gameState.playing = true;
            gameState.startTime = Date.now();
        }, 500);
    });

    setupThreeJS();
    setupPhysicsWorld();
    setupEffects();
    createTrack();
    createTrees();
    createRocks();
    createLake();
    createAnimals();
    createCar();
    setupInputs();

    requestAnimationFrame(animate);
}

function animate() {
    requestAnimationFrame(animate);
    if (gameState.playing) {
        updateDrive();
        state.world.step(1/60);
        if (state.vehicle && state.vehicle.syncVisuals) state.vehicle.syncVisuals();
        // effects + logic
        // updateDriftEffects is called inside updateGameLogic through imported function chain
        updateGameLogic();
    }
    state.renderer.render(state.scene, state.camera);
}

init();