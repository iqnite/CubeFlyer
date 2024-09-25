var gamepadManager = new BABYLON.GamepadManager();

var deviceSourceManager;

const obstacleSpawnInterval = 3.5;

class Player extends GameObject {
	constructor() {
		super();
	}

	init() {
		this.obstacleSpawnTimer = 0;
		// A Vector2 is a 2 dimensional vector with X and Y dimension - track velocity with this.
		this.velocity = new BABYLON.Vector3(0, 0);
		this.setupInputs();

		// Create the player object - a 1 unit square cube
		const sphereOptions = { diameter: 0.8 };
		this.playerMesh = BABYLON.MeshBuilder.CreateSphere("bird", sphereOptions, scene);
		this.playerMaterial = new BABYLON.StandardMaterial("Player Material", scene);
		this.playerMaterial.diffuseColor = new BABYLON.Color3(2.55, 1.45, 0);
		this.playerMaterial.diffuseTexture = new BABYLON.Texture("https://iqnite.github.io/images/cheesetexture.webp", scene);
		this.playerMesh.material = this.playerMaterial;

		resetScore();
	}

	onDestroy() {
		scene.removeMesh(this.playerMesh);
	}

	update(deltaTime) {
		// Update the players physics:
		this.velocity.y += gravity.y * deltaTime;
		this.capVelocity(20);
		this.playerMesh.position.y += this.velocity.y * deltaTime;
		if (this.velocity.y > 0) {
			this.playerMesh.rotation.z += this.velocity.y * deltaTime;
		}
		if (this.testGameOver()) {
			destroyObject(this);
			this.flashBackgroundRed();
			setTimeout(this.endGame, 500);
		}

		// To simplify game code the Player handles spawning obstacles (this makes it easier to track for collisions without writing a full handler)
		// A side effect of this is that creating or destroying the Player can pause or start the game.
		this.obstacleSpawnTimer -= deltaTime;
		if (this.obstacleSpawnTimer <= 0) {
			this.obstacleSpawnTimer = obstacleSpawnInterval;

			createObject(new Barrier());
			createObject(new Cloud());
		}
	}

	endGame() {
		// This is used to identify and remove barrier objects from the scene
		destroyMatchingObjects((gobj) => gobj.location !== undefined);
		mainMenu.visible = true;
	}

	testGameOver() {
		let outOfBounds = this.playerMesh.position.y > gameHeight || this.playerMesh.position.y < -gameHeight;

		let collision = testMatchingObjects(
			(gameObject) => gameObject.testCollision !== undefined,
			(gameObject) => gameObject.testCollision(this.playerMesh.position.y)
		);

		return outOfBounds || collision;
	}

	onPlayerFlight() {
		this.velocity.y += flightForce;
	}

	capVelocity(cap) {
		this.velocity.y = Math.min(cap, Math.max(-cap, this.velocity.y));
	}

	flashBackgroundRed() {
		const originalColor = scene.clearColor.clone();
		scene.clearColor = new BABYLON.Color3(1, 0, 0); // Red color

		setTimeout(() => {
			scene.clearColor = originalColor;
		}, 500); // Revert back after 500ms
	}

	setupInputs() {
		deviceSourceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
		/**
		 * onDeviceConnectedObservable is fired after a device is connected so any code that we
		 * put in here should be able to reliably work against an existing device.
		 *
		 * For onInputChangedObservable, this will only work with Mouse, Touch, and Keyboards because
		 * the Gamepad API currently does not fire input changed events (polling only)
		 */
		deviceSourceManager.onDeviceConnectedObservable.add((deviceSource) => {
			// If Mouse/Touch, add an Observer to change text
			if (
				deviceSource.deviceType === BABYLON.DeviceType.Mouse ||
				deviceSource.deviceType === BABYLON.DeviceType.Touch
			) {
				deviceSource.onInputChangedObservable.add((eventData) => {
					if (eventData.type === "pointerdown" && eventData.inputIndex === BABYLON.PointerInput.LeftClick) {
						this.onPlayerFlight();
					}
				});
			}
			// If Keyboard, add an Observer to change text
			else if (deviceSource.deviceType === BABYLON.DeviceType.Keyboard) {
				deviceSource.onInputChangedObservable.add((eventData) => {
					if (eventData.type === "keydown" && eventData.key === " ") {
						this.onPlayerFlight();
					}
				});
			}
		});

		// This callback is invoked when a new controller is attached:
		gamepadManager.onGamepadConnectedObservable.add((gamepad, state) => {
			// When a new controller is connected add support for detecting button presses
			gamepad.onButtonDownObservable.add((button, state) => {
				this.onPlayerFlight();
			});
		});
	}
}
