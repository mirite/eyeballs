import * as THREE from "three";

export function createRenderer() {
	const newRenderer = new THREE.WebGLRenderer({antialias: true});
	newRenderer.setPixelRatio(window.devicePixelRatio);
	newRenderer.setSize(window.innerWidth, window.innerHeight);
	return newRenderer;
}
