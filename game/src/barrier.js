var obstacleSpeed = 1.5; // Changing this will impact how quickly obstacles in the game move.
var ySpeed = 0.5; // Changing this will impact how quickly the obstacles tighten.
var gapSize = 12.5; // This determines the size of the gap to create between the floor and ceiling.

class Barrier extends GameObject {
	constructor() {
		super();
	}

	init() {
		// This is hardcoded for now - should be some location off the right side of the screen
		this.location = 15;

		// Creates 2 cylinders which will be used for the top and bottom obstacles,
		// the floor will obscure the height of the object so we don't need to modify this much.
		const cylinderOptions = { diameter: 1, height: 10};
		this.ceilingCylinder = BABYLON.MeshBuilder.CreateCylinder("ceilingObstacle", cylinderOptions, scene);
		this.floorCylinder = BABYLON.MeshBuilder.CreateCylinder("floorObstacle", cylinderOptions, scene);
		// Materials impact how an object is rendered like color, texture etc.
		let barrierMaterial = new BABYLON.StandardMaterial("Barrier Material", scene);
		barrierMaterial.diffuseColor = BABYLON.Color3.Green();
		this.ceilingCylinder.material = barrierMaterial;
		this.floorCylinder.material = barrierMaterial;
		this.assignLocations();
	}

	onDestroy() {
		// Remember when destroying an object to remove all meshes it creates from the scene!
		scene.removeMesh(this.ceilingCylinder);
		scene.removeMesh(this.floorCylinder);
	}

	update(deltaTime) {
		this.location -= deltaTime * obstacleSpeed;

		// Update the players physics:
		this.ceilingCylinder.position.x = this.location;
		this.floorCylinder.position.x = this.location;
		this.ceilingCylinder.position.y -= deltaTime * ySpeed;
		this.floorCylinder.position.y += deltaTime * ySpeed;

		if (this.location < 0 && this.location > -deltaTime * obstacleSpeed) {
			addScore(1);
		}
		if (this.location < -25) {
			destroyObject(this);
		}
	}

	assignLocations() {
		// Pick a random center point
		let height = -gameHeight + 3.5 / 2 + Math.random() * (gameHeight - 2) * 2;
		this.ceilingCylinder.position.y = height + gapSize / 2 + 5;
		this.floorCylinder.position.y = height - gapSize / 2 - 5;
		this.ceilingCylinder.position.x = this.location;
		this.floorCylinder.position.x = this.location;
	}

	testCollision(playerHeight) {
		if (this.location > -1 && this.location < 1) {
			// In the same location as the player
			if (
				playerHeight + 5.5 > this.ceilingCylinder.position.y || // 5.5 is the half the height of the box + half the height of the player
				playerHeight - 5.5 < this.floorCylinder.position.y
			) {
				return true;
			}
		}
		return false;
	}
}
