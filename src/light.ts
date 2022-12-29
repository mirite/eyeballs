import { PointLight } from 'three';

export function createLighting() {
	const light = new PointLight(0xffffff);
	light.position.set(0, 0, 30);
	return light;
}
