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
[[5, 5], [5, 10], [15, 5], [15, 10]].forEach(([x, y]) => {
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
	mesh.lookAt(cursor.x, cursor.y, cursor.z);
	if (mesh.rotation.x > ( Math.PI / 4)) {
		mesh.rotation.x -= 0.4;
	}
	if (mesh.rotation.x < -1*(Math.PI / 4)) {
		mesh.rotation.x += 0.4;
	}

	console.log(mesh.rotation.y)
	//mesh.rotation.setFromQuaternion(qrot)
}

function cursorToViewport(value: number, scale: number): number {

	const originInCentre = value - (0.5 * scale);
	return originInCentre;
}

window.addEventListener('mousemove', (e) => {
	const {x, y} = e;
	const scaledX = cursorToViewport(x, window.innerWidth);
	const scaledY = cursorToViewport(y, window.innerHeight) * -1;
	cursor = new Vector3(scaledX, scaledY, 35);
});
