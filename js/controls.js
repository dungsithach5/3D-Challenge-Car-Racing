import { state, config } from './state.js';

export function setupInputs() {
    window.addEventListener('keydown', (e) => {
        if (state.keys.hasOwnProperty(e.key) || state.keys.hasOwnProperty(e.code)) {
            state.keys[e.key] = true;
            state.keys[e.code] = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (state.keys.hasOwnProperty(e.key) || state.keys.hasOwnProperty(e.code)) {
            state.keys[e.key] = false;
            state.keys[e.code] = false;
        }
    });
}

export function updateDrive() {
    if (!state.vehicle) return;
    const maxSteerVal = config.maxSteerVal;
    const maxForce = config.maxForce;
    const steerSpeed = config.steerSpeed;

    let targetSteer = 0;
    if (state.keys.a || state.keys.ArrowLeft) targetSteer = -maxSteerVal;
    if (state.keys.d || state.keys.ArrowRight) targetSteer = maxSteerVal;

    if (state.currentSteering < targetSteer) {
        state.currentSteering += steerSpeed;
        if (state.currentSteering > targetSteer) state.currentSteering = targetSteer;
    } else if (state.currentSteering > targetSteer) {
        state.currentSteering -= steerSpeed;
        if (state.currentSteering < targetSteer) state.currentSteering = targetSteer;
    }

    state.vehicle.setSteeringValue(state.currentSteering, 0);
    state.vehicle.setSteeringValue(state.currentSteering, 1);

    let force = 0;
    if (state.keys.w || state.keys.ArrowUp) force = maxForce;
    if (state.keys.s || state.keys.ArrowDown) force = -maxForce;

    state.vehicle.applyEngineForce(force, 2);
    state.vehicle.applyEngineForce(force, 3);
}