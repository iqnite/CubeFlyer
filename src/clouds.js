var cloudSpeed = 1.5;

class Cloud extends GameObject {
	constructor() {
		super();
	}

	init() {
		// This is hardcoded for now - should be some location off the right side of the screen
		this.location = 25;

		const boxOptions = { width: 1, height: 1, depth: 1 };
		this.cube = BABYLON.MeshBuilder.CreateBox("cloud", boxOptions, scene);
		// Materials impact how an object is rendered like color, texture etc.
		let cloudMaterial = new BABYLON.StandardMaterial("Cloud Material", scene);
		cloudMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
		cloudMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		cloudMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
		cloudMaterial.ambientColor = new BABYLON.Color3(1, 1, 1);
		cloudMaterial.alpha = 0.8;
		cloudMaterial.backFaceCulling = false;
		this.cube.material = cloudMaterial;
		this.assignLocations();
	}

	onDestroy() {
		// Remember when destroying an object to remove all meshes it creates from the scene!
		scene.removeMesh(this.cube);
	}

	update(deltaTime) {
		this.location -= deltaTime * obstacleSpeed;

		// Update the players physics:
		this.cube.position.x = this.location;

		if (this.location < -35) {
			destroyObject(this);
		}
	}

	assignLocations() {
		// Pick a random center point
		let height = Math.random() * (gameHeight - 1.5) * 2;
		this.cube.position.y = height;
		this.cube.position.x = this.location;
		this.cube.position.z = 10;
	}
}
