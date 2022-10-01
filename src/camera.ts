import * as THREE from "three";

export function createCamera() {
	const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
	newCamera.position.setZ(30);
	return newCamera;
}
