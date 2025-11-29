import { THREE, CANNON } from './libs.js';
import { state } from './state.js';

export function createLake() {
    // Tạo một hồ nước lớn ở trung tâm
    const lakeGeo = new THREE.CircleGeometry(18, 32);
    const lakeMat = new THREE.MeshStandardMaterial({
        color: 0x44aaff,
        roughness: 0.1,
        metalness: 0.6,
        transparent: true,
        opacity: 0.8
    });

    const lake = new THREE.Mesh(lakeGeo, lakeMat);
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(0, 0.05, 0); // Đặt cao hơn mặt đất một chút
    lake.receiveShadow = true;
    state.scene.add(lake);
    
    // Một hồ nước nhỏ ở góc
    const pondGeo = new THREE.CircleGeometry(10, 32);
    const pond = new THREE.Mesh(pondGeo, lakeMat);
    pond.rotation.x = -Math.PI / 2;
    pond.position.set(-90, 0.05, 40); 
    pond.receiveShadow = true;
    state.scene.add(pond);
}