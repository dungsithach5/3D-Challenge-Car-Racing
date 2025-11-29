import { THREE, CANNON } from './libs.js';
import { state } from './state.js';

export function createTrees() {
    // Định nghĩa hình dáng cây
    const foliageGeo = new THREE.ConeGeometry(3, 8, 8); // Tán lá
    const foliageMat = new THREE.MeshStandardMaterial({ 
        color: 0x228b22, 
        roughness: 0.8,
        flatShading: true 
    });
    
    const trunkGeo = new THREE.CylinderGeometry(0.8, 0.8, 3); // Thân cây
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });

    // Hàm helper để đặt một cây
    function addTree(x, z) {
        const treeGroup = new THREE.Group();

        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 1.5;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        treeGroup.add(trunk);

        const foliage = new THREE.Mesh(foliageGeo, foliageMat);
        foliage.position.y = 6;
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        treeGroup.add(foliage);

        // Thêm ngẫu nhiên một chút biến thể
        const scale = 0.8 + Math.random() * 0.4;
        treeGroup.scale.set(scale, scale, scale);
        treeGroup.rotation.y = Math.random() * Math.PI;

        treeGroup.position.set(x, 0, z);
        state.scene.add(treeGroup);
    }

    // Tạo cây rải rác
    for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Random bán kính: hoặc là xa bên ngoài, hoặc là trong tâm
        // Track radii are roughly X=60, Z=40. Width=24.
        // Inner limit ~ X=48, Z=28. Outer limit ~ X=72, Z=52.
        
        const isOutside = Math.random() > 0.3; // 70% cây ở bên ngoài
        let radiusX, radiusZ;

        if (isOutside) {
            // Cây bên ngoài (xa hơn bán kính ngoài của track)
            const dist = 80 + Math.random() * 100;
            radiusX = dist;
            radiusZ = dist * 0.7; // Giữ tỉ lệ elip
        } else {
            // Cây bên trong (gần tâm hơn bán kính trong của track)
            const dist = Math.random() * 25;
            radiusX = dist;
            radiusZ = dist * 0.7;
        }

        const x = Math.cos(angle) * radiusX;
        const z = Math.sin(angle) * radiusZ;

        addTree(x, z);
    }
}