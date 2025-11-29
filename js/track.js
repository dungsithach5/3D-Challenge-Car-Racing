import { THREE, CANNON } from './libs.js';
import { state } from './state.js';

export const checkpoints = [
    { x: 0, z: -40, w: 40, h: 10 },
    { x: -60, z: 0, w: 10, h: 40 },
    { x: 0, z: 40, w: 40, h: 10 },
    { x: 60, z: 0, w: 10, h: 40 }
];

export function createTrack() {
    function createWall(x, z, w, h, rotationY = 0, color = 0x666666) {
        const height = 2;
        const shape = new CANNON.Box(new CANNON.Vec3(w/2, height/2, h/2));
        const body = new CANNON.Body({ mass: 0 });
        body.addShape(shape);
        body.position.set(x, height/2, z);
        body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), rotationY);
        state.world.addBody(body);

        const geo = new THREE.BoxGeometry(w, height, h);
        const mat = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        state.scene.add(mesh);
    }

    const trackRadiusX = 60;
    const trackRadiusZ = 40;
    const trackWidth = 24;
    const segments = 32;

    for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const nextTheta = ((i + 1) / segments) * Math.PI * 2;
        const midTheta = (theta + nextTheta) / 2;
        const dx = -trackRadiusX * Math.sin(midTheta);
        const dz = trackRadiusZ * Math.cos(midTheta);
        const rotation = Math.atan2(dz, dx);
        const x = trackRadiusX * Math.cos(midTheta);
        const z = trackRadiusZ * Math.sin(midTheta);
        const len = Math.sqrt(dx*dx + dz*dz);
        const nx = -dz / len;
        const nz = dx / len;
        const wallLength = (Math.PI * 2 * Math.sqrt((trackRadiusX*trackRadiusX + trackRadiusZ*trackRadiusZ)/2)) / segments;
        const wallColor = i % 2 === 0 ? 0xd63031 : 0xf5f6fa;

        const outerX = x - nx * (trackWidth / 2);
        const outerZ = z - nz * (trackWidth / 2);
        createWall(outerX, outerZ, wallLength + 1, 1, -rotation, wallColor);

        const innerX = x + nx * (trackWidth / 2);
        const innerZ = z + nz * (trackWidth / 2);
        createWall(innerX, innerZ, wallLength + 1, 1, -rotation, wallColor);
    }

    const lineGeo = new THREE.PlaneGeometry(trackWidth - 2, 4);
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white'; ctx.fillRect(0,0,64,64);
    ctx.fillStyle = 'black'; ctx.fillRect(0,0,32,32); ctx.fillRect(32,32,32,32);
    const checkerTex = new THREE.CanvasTexture(canvas);
    checkerTex.wrapS = THREE.RepeatWrapping; checkerTex.wrapT = THREE.RepeatWrapping;
    checkerTex.repeat.set(4,1);
    const lineMat = new THREE.MeshBasicMaterial({ map: checkerTex, side: THREE.DoubleSide });
    const startLine = new THREE.Mesh(lineGeo, lineMat);
    startLine.rotation.x = -Math.PI/2;
    startLine.position.set(0, 0.05, -trackRadiusZ);
    state.scene.add(startLine);
}