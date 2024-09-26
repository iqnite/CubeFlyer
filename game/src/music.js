const MUSIC_URL = "https://iqnite.github.io/CubeFlyer/music/fire.mp3";

class Music extends GameObject {
    constructor() {
        super();
    }

    init() {
        this.scale = 1;
        this.music = null;
        this.analyser = null;
        document.addEventListener("click", () => {
            // Load the sound and play it automatically once ready
            this.music = new BABYLON.Sound("Music", MUSIC_URL, scene, null, {
                loop: true,
                autoplay: true,
            });
            this.analyser = new BABYLON.Analyser(scene);
            BABYLON.Engine.audioEngine.connectToAnalyser(this.analyser);
        }, { once: true });
    }

    update(deltaTime) {
        if (!this.analyser) return;
        let frequencyData = this.analyser.getByteFrequencyData();
        let averageFrequency = frequencyData.reduce((a, b) => a + b, 0) / frequencyData?.length;
        this.scale = 1 + averageFrequency / 75; // Scale factor based on frequency
    }
}

var music = new Music();
createObject(music);
