import * as THREE from "three";

export function createCamera() {
	const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 1000);
	newCamera.position.setZ(30);
	newCamera.position.setX(10);
	newCamera.position.setY(10);
	return newCamera;
}
