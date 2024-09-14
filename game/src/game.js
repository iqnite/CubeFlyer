//import { createScene } from 'scene.js';

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const scene = createScene(); //Call the createScene function from scene.js
scene.clearColor = new BABYLON.Color3(0, 213, 255);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

scene.registerBeforeRender(function () {
	updateGame();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});
