import { followCursor } from './cursor';
import type { Camera, Mesh, Renderer, Scene } from 'three';

export function animation(
	eyeballs: Mesh[],
	renderer: Renderer,
	scene: Scene,
	camera: Camera
) {
	for (const eyeball of eyeballs) {
		followCursor(eyeball);
	}
	renderer.render(scene, camera);
}
