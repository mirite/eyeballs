import * as THREE from 'three';
import {Mesh, Vector3} from 'three';
import {createCamera} from "./camera";
import {createRenderer} from "./renderer";
import {createLighting} from "./light";
import {addEyeball} from "./eyes";

const camera = createCamera();
const scene = new THREE.Scene();
const renderer = createRenderer();
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

const backgroundTexture = new THREE.TextureLoader().load("/background.jpg");

const eyeballs: Mesh[] = [];
[[10, 10], [-10, 10], [10, -10], [-10, -10]].forEach(([x, y]) => {
	eyeballs.push(addEyeball(x, y, scene));
})

const light = createLighting();
scene.add(light);
scene.background = backgroundTexture;
let cursor: Vector3;

function animation() {
	if (cursor) {
		for (const eyeball of eyeballs) {
			followCursor(eyeball);
		}
	}
	renderer.render(scene, camera);
}


function followCursor(mesh: Mesh) {
	const qrot = new THREE.Quaternion();
	const adjustedMeshPosition = mesh.position.clone();
	// if (mesh.position.x < 0) {
	// 	adjustedMeshPosition.x *= -1;
	// }
	//
	// if (mesh.position.y < 0) {
	// 	adjustedMeshPosition.y *= -1;
	// }
	qrot.setFromUnitVectors(adjustedMeshPosition, cursor);
	mesh.rotation.setFromQuaternion(qrot)

}

function cursorToViewport(value: number, scale: number): number {
	const scaled = value / scale;
	return scaled - (0.5 * scaled);
}

window.addEventListener('mousemove', (e) => {
	const {x, y} = e;
	const scaledX = cursorToViewport(x, window.innerWidth);
	const scaledY = cursorToViewport(y, window.innerHeight) * -1;
	console.log(scaledX, scaledY);
	cursor = new Vector3(scaledX, scaledY, 30);
});
