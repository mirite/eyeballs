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
[[5, 5], [10, 10], [15, 15], [2, 2]].forEach(([x, y]) => {
	eyeballs.push(addEyeball(x, y, scene));
})

const light = createLighting();
scene.add(light);
scene.background = backgroundTexture;
let cursor: Vector3;
const pupilCorrection = new THREE.Euler(0.2, 0.2, 0);
function animation() {
	if (cursor) {
		for (const eyeball of eyeballs) {
			followCursor(eyeball);
			//eyeball.rotation.set(pupilCorrection.x, pupilCorrection.y, pupilCorrection.z, pupilCorrection.order);
		}
	}
	renderer.render(scene, camera);
}


function followCursor(mesh: Mesh) {
	mesh.lookAt(cursor.x, cursor.y, cursor.z);
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
	console.log(scaledX, scaledY);
	cursor = new Vector3( scaledX, scaledY, 10);
});
