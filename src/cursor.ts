import {Mesh, Vector3} from "three";

let cursor: Vector3;

function cursorToViewport(value: number, scale: number): number {
	return value - (0.5 * scale);
}

export function setFromCursor(e: MouseEvent) {
	const {x, y} = e;
	const scaledX = cursorToViewport(x, window.innerWidth);
	const scaledY = cursorToViewport(y, window.innerHeight) * -1;
	cursor = new Vector3(scaledX, scaledY, 35);
}

export function followCursor(mesh: Mesh) {
	if (!cursor) return;
	mesh.lookAt(cursor.x, cursor.y, cursor.z);
	if (mesh.rotation.x > (Math.PI / 4)) {
		mesh.rotation.x -= 0.4;
	}
	if (mesh.rotation.x < -1 * (Math.PI / 4)) {
		mesh.rotation.x += 0.4;
	}
}
