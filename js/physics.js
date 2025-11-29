import { CANNON } from './libs.js';
import { state } from './state.js';
import { THREE } from './libs.js';

export function setupPhysicsWorld() {
    state.world = new CANNON.World();
    state.world.gravity.set(0, state.world ? state.world.gravity : -9.82, 0); // placeholder; will set below
    state.world.gravity.set(0, -9.82, 0);
    state.world.broadphase = new CANNON.SAPBroadphase(state.world);

    state.physicsMaterial = new CANNON.Material('physics');
    const physics_physics = new CANNON.ContactMaterial(state.physicsMaterial, state.physicsMaterial, {
        friction: 0.3,
        restitution: 0.2
    });
    state.world.addContactMaterial(physics_physics);

    // Ground
    state.groundMaterial = new CANNON.Material('ground');
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0, material: state.groundMaterial });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2);
    state.world.addBody(groundBody);

    // Visual ground
    const grassTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/terrain/grasslight-big.jpg');
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(50, 50);
    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.MeshStandardMaterial({ map: grassTexture, roughness: 1.0, metalness: 0.0, color: 0x88cc88 });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.receiveShadow = true;
    state.scene.add(planeMesh);

    const wheel_ground = new CANNON.ContactMaterial(state.groundMaterial, state.physicsMaterial, {
        friction: 0.6,
        restitution: 0,
        contactEquationStiffness: 1000
    });
    state.world.addContactMaterial(wheel_ground);
}