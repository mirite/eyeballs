import * as THREE from 'three';
import { Mesh } from 'three';
import { createCamera } from './camera';
import { createRenderer } from './renderer';
import { createLighting } from './light';
import { addEyeball } from './eyes';
import { setFromCursor } from './cursor';
import { animation } from './animation';

const camera = createCamera();
const scene = new THREE.Scene();
const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

const backgroundTexture = new THREE.TextureLoader().load('/background.jpg');

const eyeballs: Mesh[] = [];
[
	[5, 5],
	[5, 10],
	[15, 5],
	[15, 10],
].forEach(([x, y]) => {
	eyeballs.push(addEyeball(x, y, scene));
});

const light = createLighting();
scene.add(light);
scene.background = backgroundTexture;
renderer.setAnimationLoop(() => animation(eyeballs, renderer, scene, camera));

window.addEventListener('mousemove', (e) => {
	setFromCursor(e);
});
