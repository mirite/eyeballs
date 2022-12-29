import * as THREE from 'three';

const geometry = new THREE.SphereGeometry(2);
const eyeTexture = new THREE.TextureLoader().load('/map.jpg');
const vertexShader = document.getElementById('vertex_shader')!
	.textContent as string;
const fragmentShader = document.getElementById('fragment_shader')!
	.textContent as string;
const uniforms = {
	tex: {
		value: eyeTexture,
	},
};
const material = new THREE.ShaderMaterial({
	uniforms,
	vertexShader,
	fragmentShader,
});

export function addEyeball(x: number, y: number, scene: THREE.Scene) {
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, 0);
	scene.add(mesh);
	return mesh;
}
