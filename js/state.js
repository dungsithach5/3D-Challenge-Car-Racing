export const config = {
    shadows: true,
    gravity: -9.82,
    maxSteerVal: 0.35,
    steerSpeed: 0.05,
    maxForce: 1000,
    brakeForce: 1000000,
    timeStep: 1 / 60
};

export const gameState = {
    playing: false,
    startTime: 0,
    currentLap: 1,
    totalLaps: 3,
    checkpointsPassed: 0,
    lastCheckpointIndex: -1,
    lastLapTime: 0
};

export const state = {
    scene: null,
    camera: null,
    renderer: null,
    world: null,
    physicsMaterial: null,
    groundMaterial: null,
    vehicle: null,
    chassisMesh: null,
    wheelMeshes: [],
    particles: [],
    particleGeo: null,
    particleMat: null,
    keys: { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false },
    currentSteering: 0,
    // UI elements (set in main)
    timeDisplay: null,
    speedDisplay: null,
    lapDisplay: null,
    lapMsg: null,
    driftIndicator: null
};