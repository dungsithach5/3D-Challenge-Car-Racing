import { state, gameState } from './state.js';
import { checkpoints } from './track.js';
import { updateDriftEffects } from './effects.js';
import { THREE } from './libs.js';

export function updateGameLogic() {
    if (!gameState.playing || !state.vehicle) return;

    const speed = state.vehicle.chassisBody.velocity.length() * 3.6;
    if (state.speedDisplay) state.speedDisplay.innerText = Math.floor(speed);

    const elapsed = Date.now() - gameState.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = ((elapsed % 60000) / 1000).toFixed(2);
    if (state.timeDisplay) state.timeDisplay.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const carPos = state.vehicle.chassisBody.position;
    const offset = new THREE.Vector3(0,5,10);
    offset.applyQuaternion(state.vehicle.chassisBody.quaternion);
    offset.add(state.vehicle.chassisBody.position);
    state.camera.position.lerp(offset, 0.1);
    state.camera.lookAt(carPos.x, carPos.y + 1, carPos.z);

    checkCheckpoints(carPos);
    updateDriftEffects(state.camera);
}

function checkCheckpoints(pos) {
    const cpIndex = checkpoints.findIndex(cp => {
        return pos.x > cp.x - cp.w/2 &&
               pos.x < cp.x + cp.w/2 &&
               pos.z > cp.z - cp.h/2 &&
               pos.z < cp.z + cp.h/2;
    });

    if (cpIndex !== -1) {
        const nextRequired = (gameState.lastCheckpointIndex + 1) % checkpoints.length;
        if (cpIndex === nextRequired) {
            gameState.lastCheckpointIndex = cpIndex;
            if (cpIndex === 0 && gameState.checkpointsPassed > 0) {
                completeLap();
            }
            gameState.checkpointsPassed++;
        }
    }
}

function completeLap() {
    if (Date.now() - (gameState.lastLapTime || 0) < 5000) return;
    gameState.lastLapTime = Date.now();
    gameState.currentLap++;
    if (gameState.currentLap > gameState.totalLaps) {
        finishGame();
    } else {
        if (state.lapDisplay) state.lapDisplay.innerText = gameState.currentLap;
        showNotification(`LAP ${gameState.currentLap}`);
    }
}

function showNotification(text) {
    if (!state.lapMsg) return;
    state.lapMsg.innerText = text;
    state.lapMsg.style.opacity = 1;
    setTimeout(() => state.lapMsg.style.opacity = 0, 2000);
}

function finishGame() {
    gameState.playing = false;
    showNotification("FINISHED!");
    setTimeout(() => {
        alert(`Race Finished! Time: ${state.timeDisplay ? state.timeDisplay.innerText : '00:00.00'}`);
        location.reload();
    }, 1000);
}