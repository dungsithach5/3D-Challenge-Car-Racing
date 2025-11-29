import { THREE, CANNON } from './libs.js';
import { state } from './state.js';

export function createRocks() {
    // Sử dụng hình khối đa diện để tạo dáng đá low-poly (Dodecahedron)
    const rockGeo = new THREE.DodecahedronGeometry(1, 0); 
    const rockMat = new THREE.MeshStandardMaterial({ 
        color: 0x777777, 
        roughness: 0.9,
        flatShading: true 
    });

    function addRock(x, z, scale) {
        const rock = new THREE.Mesh(rockGeo, rockMat);
        // Đặt vị trí y sao cho đá nằm một phần dưới đất để trông tự nhiên hơn
        rock.position.set(x, scale * 0.3, z); 
        rock.scale.set(scale, scale * 0.7, scale); // Hơi dẹt một chút
        
        // Xoay ngẫu nhiên mọi trục
        rock.rotation.set(
            Math.random() * Math.PI, 
            Math.random() * Math.PI, 
            Math.random() * Math.PI
        );
        
        rock.castShadow = true;
        rock.receiveShadow = true;
        state.scene.add(rock);
    }

    // Tạo 50 tảng đá rải rác
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        
        const isOutside = Math.random() > 0.4; 
        let radiusX, radiusZ;

        if (isOutside) {
            // Đá ở khu vực xa
            const dist = 70 + Math.random() * 90;
            radiusX = dist;
            radiusZ = dist * 0.7;
        } else {
            // Đá ở khu vực trung tâm
            const dist = Math.random() * 30;
            radiusX = dist;
            radiusZ = dist * 0.7;
        }

        const x = Math.cos(angle) * radiusX;
        const z = Math.sin(angle) * radiusZ;
        
        // Kích thước ngẫu nhiên từ 1 đến 3.5
        const scale = 1 + Math.random() * 2.5; 

        addRock(x, z, scale);
    }
}