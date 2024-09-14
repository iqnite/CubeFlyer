var audio = document.getElementById('music');

document.addEventListener('click', () => {
    audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
    });
});
