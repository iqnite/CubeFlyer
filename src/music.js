var analyser;

const MUSIC_URL = "https://iqnite.github.io/CubeFlyer/music/fire.mp3";

document.addEventListener('click', () => {
    // Load the sound and play it automatically once ready
    const music = new BABYLON.Sound("Music", MUSIC_URL, scene, null, {
        loop: true,
        autoplay: true,
    });

    analyser = new BABYLON.Analyser(scene);
    BABYLON.Engine.audioEngine.connectToAnalyser(analyser);
}, { once: true });
