var analyser;


document.addEventListener('click', () => {
    // Load the sound and play it automatically once ready
    const music = new BABYLON.Sound("Music", "https://iqnite.github.io/images/Fire.mp3", scene, null, {
        loop: true,
        autoplay: true,
    });

    analyser = new BABYLON.Analyser(scene);
    BABYLON.Engine.audioEngine.connectToAnalyser(analyser);
}, { once: true });
