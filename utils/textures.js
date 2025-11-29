import * as THREE from 'https://cdn.skypack.dev/three';

export function createTexture(name) {
  const loader = new THREE.TextureLoader();
  switch(name) {
    case 'grass':
      return loader.load('https://threejsfundamentals.org/threejs/resources/images/grasslight-big.jpg');
    default:
      return null;
  }
}
