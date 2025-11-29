import { THREE } from './libs.js';
import { state } from './state.js';

export function setupEffects() {
    state.particleGeo = new THREE.PlaneGeometry(0.8, 0.8);
    state.particleMat = new THREE.MeshBasicMaterial({
        color: 0xeeeeee,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        side: THREE.DoubleSide
    });
}

export function spawnSmoke(position, camera) {
    const mat = state.particleMat.clone();
    const mesh = new THREE.Mesh(state.particleGeo, mat);
    mesh.position.copy(position);
    mesh.position.y = 0.1;
    mesh.position.x += (Math.random() - 0.5) * 0.5;
    mesh.position.z += (Math.random() - 0.5) * 0.5;
    state.scene.add(mesh);
    state.particles.push({ mesh, life: 1.0 });
}

export function updateDriftEffects(camera) {
    if (!state.vehicle) return;
    const worldVel = state.vehicle.chassisBody.velocity;
    const quat = state.vehicle.chassisBody.quaternion;
    const invQuat = quat.inverse();
    const localVel = invQuat.vmult(worldVel);
    const driftThreshold = 2.0;
    const isDrifting = Math.abs(localVel.x) > driftThreshold;

    if (isDrifting) {
        if (state.driftIndicator) state.driftIndicator.style.opacity = 1;
        if (Math.random() > 0.3) {
            [2,3].forEach(i => {
                const t = state.vehicle.wheelInfos[i].worldTransform;
                spawnSmoke(t.position, camera);
            });
        }
    } else {
        if (state.driftIndicator) state.driftIndicator.style.opacity = 0;
    }

    for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.life -= 0.02;
        if (p.life <= 0) {
            state.scene.remove(p.mesh);
            state.particles.splice(i, 1);
        } else {
            p.mesh.position.y += 0.05;
            p.mesh.scale.setScalar(1 + (1 - p.life) * 2);
            p.mesh.material.opacity = p.life * 0.5;
            p.mesh.rotation.z += 0.1;
            p.mesh.lookAt(camera.position);
        }
    }
}