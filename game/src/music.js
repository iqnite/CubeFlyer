var averageFrequency;
var source;
var audioContext;
var analyser;
var frequencyData;
var audio = document.getElementById('music');

audio.addEventListener('canplaythrough', () => {
    // Initialize audio context and analyser only once
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.connect(audioContext.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
});

// Add click event listener only once
document.addEventListener('click', () => {
    audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
    });
});

function getAverageFrequency() {
    analyser?.getByteFrequencyData(frequencyData);
    return frequencyData?.reduce((a, b) => a + b) / frequencyData?.length;
}

function updateMusic() {
    averageFrequency = getAverageFrequency();
}
