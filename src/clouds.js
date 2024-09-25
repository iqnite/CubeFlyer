var cloudSpeed = 1.5;

class Cloud extends GameObject {
	constructor() {
		super();
	}

	init() {
		this.location = 25;
		const boxOptions = { width: 1, height: 1, depth: 1 };
		this.cube = BABYLON.MeshBuilder.CreateBox("cloud", boxOptions, scene);
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
		scene.removeMesh(this.cube);
	}

	update(deltaTime) {
		this.location -= deltaTime * obstacleSpeed;
		this.cube.position.x = this.location;

		if (this.location < -35) {
			destroyObject(this);
		}

		// Update cloud size based on music frequency
		if (analyser) {
			let frequencyData = analyser.getByteFrequencyData();
			let averageFrequency = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;
			let scale = 1 + averageFrequency / 75; // Scale factor based on frequency
			this.cube.scaling = new BABYLON.Vector3(scale, scale, scale);
		}
	}

	assignLocations() {
		let height = Math.random() * (gameHeight - 1.5) * 2;
		this.cube.position.y = height;
		this.cube.position.x = this.location;
		this.cube.position.z = 10;
	}
}
