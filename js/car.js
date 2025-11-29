import { CANNON, THREE } from './libs.js';
import { state } from './state.js';

export function createCar() {
    const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.25, 2));
    const chassisBody = new CANNON.Body({ mass: 150, material: state.physicsMaterial });
    chassisBody.addShape(chassisShape);
    chassisBody.position.set(0, 2, -40);
    chassisBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), -Math.PI/2);
    chassisBody.angularDamping = 0.5;

    const chassisMesh = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(2, 0.5, 4);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff3e3e, metalness: 0.6, roughness: 0.4 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    chassisMesh.add(bodyMesh);
    const cabinGeo = new THREE.BoxGeometry(1.8, 0.4, 2);
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.y = 0.45;
    cabinMesh.position.z = -0.2;
    chassisMesh.add(cabinMesh);

    const vehicle = new CANNON.RaycastVehicle({
        chassisBody: chassisBody,
        indexRightAxis: 0,
        indexUpAxis: 1,
        indexForwardAxis: 2
    });

    const wheelOptions = {
        radius: 0.4,
        directionLocal: new CANNON.Vec3(0, -1, 0),
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 1.4,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: new CANNON.Vec3(1, 0, 0),
        chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true
    };

    wheelOptions.chassisConnectionPointLocal.set(1, 0, 1.2);
    vehicle.addWheel(wheelOptions);
    wheelOptions.chassisConnectionPointLocal.set(-1, 0, 1.2);
    vehicle.addWheel(wheelOptions);
    wheelOptions.chassisConnectionPointLocal.set(1, 0, -1.2);
    vehicle.addWheel(wheelOptions);
    wheelOptions.chassisConnectionPointLocal.set(-1, 0, -1.2);
    vehicle.addWheel(wheelOptions);

    vehicle.addToWorld(state.world);

    const wheelBodies = [];
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 20);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });

    vehicle.wheelInfos.forEach(() => {
        const wMesh = new THREE.Mesh(wheelGeo, wheelMat);
        wMesh.castShadow = true;
        state.scene.add(wMesh);
        wheelBodies.push(wMesh);
    });

    vehicle.syncVisuals = () => {
        chassisMesh.position.copy(chassisBody.position);
        chassisMesh.quaternion.copy(chassisBody.quaternion);
        for (let i = 0; i < vehicle.wheelInfos.length; i++) {
            vehicle.updateWheelTransform(i);
            const t = vehicle.wheelInfos[i].worldTransform;
            wheelBodies[i].position.copy(t.position);
            wheelBodies[i].quaternion.copy(t.quaternion);
        }
    };

    state.vehicle = vehicle;
    state.chassisMesh = chassisMesh;
    state.wheelMeshes = wheelBodies;
    state.scene.add(chassisMesh);
}