import { THREE, CANNON } from './libs.js';
import { state } from './state.js';

export function createAnimals() {
    // 1. Vịt/Thiên nga bơi trong hồ (Low poly)
    const duckGroup = new THREE.Group();
    
    // Thân vịt
    const bodyGeo = new THREE.CapsuleGeometry(0.5, 1, 4, 8); 
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 2;
    body.rotation.y = Math.PI / 2;
    duckGroup.add(body);

    // Cổ
    const neckGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.8);
    const neck = new THREE.Mesh(neckGeo, bodyMat);
    neck.position.set(0.4, 0.5, 0);
    duckGroup.add(neck);

    // Đầu
    const headGeo = new THREE.SphereGeometry(0.25);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(0.5, 0.9, 0);
    duckGroup.add(head);
    
    // Mỏ
    const beakGeo = new THREE.ConeGeometry(0.08, 0.2, 8);
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.rotation.z = -Math.PI / 2;
    beak.position.set(0.7, 0.9, 0);
    duckGroup.add(beak);

    // Tạo vài con vịt trong hồ lớn
    for(let i=0; i<10; i++) {
        const duck = duckGroup.clone();
        // Hồ trung tâm bán kính ~18
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 10; // Giữ vịt trong lòng hồ
        duck.position.set(Math.cos(angle)*r, 0.2, Math.sin(angle)*r);
        duck.rotation.y = Math.random() * Math.PI * 2;
        state.scene.add(duck);
    }
        // Vịt trong hồ nhỏ
    for(let i=0; i<5; i++) {
        const duck = duckGroup.clone();
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 5; 
        // Hồ nhỏ tâm (-90, 40)
        duck.position.set(-90 + Math.cos(angle)*r, 0.2, 40 + Math.sin(angle)*r);
        duck.rotation.y = Math.random() * Math.PI * 2;
        state.scene.add(duck);
    }

    // 2. Hươu/Nai gặm cỏ (Low poly blocks)
    function createDeer(x, z, rot) {
        const deerColor = 0x8B4513; // SaddleBrown
        const deerGroup = new THREE.Group();

        // Thân
        const dBody = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 1, 3), 
            new THREE.MeshStandardMaterial({ color: deerColor })
        );
        dBody.position.y = 1.5;
        deerGroup.add(dBody);

        // 4 Chân
        const legGeo = new THREE.BoxGeometry(0.3, 1.5, 0.3);
        const legMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21 });
        const positions = [
            {x: -0.5, z: 1}, {x: 0.5, z: 1},
            {x: -0.5, z: -1}, {x: 0.5, z: -1}
        ];
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeo, legMat);
            leg.position.set(pos.x, 0.75, pos.z);
            deerGroup.add(leg);
        });

        // Đầu & Cổ
        const dHead = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.8, 1), 
            new THREE.MeshStandardMaterial({ color: deerColor })
        );
        dHead.position.set(0, 2.8, 1.8);
        deerGroup.add(dHead);

        const dNeck = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 1.2, 0.6),
            new THREE.MeshStandardMaterial({ color: deerColor })
        );
        dNeck.position.set(0, 2, 1.3);
        dNeck.rotation.x = -Math.PI / 6;
        deerGroup.add(dNeck);

        deerGroup.position.set(x, 0, z);
        deerGroup.rotation.y = rot;
        
        // Shadow properties
        deerGroup.traverse(o => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

        state.scene.add(deerGroup);
    }

    // Đặt hươu rải rác bên ngoài (khu vực rừng)
    for(let i=0; i<12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 75 + Math.random() * 30; // Xa ngoài đường đua
        createDeer(Math.cos(angle)*dist, Math.sin(angle)*dist, Math.random()*Math.PI*2);
    }
}