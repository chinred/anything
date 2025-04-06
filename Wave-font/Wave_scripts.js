document.getElementById('submitButton').addEventListener('click', () => {
    const inputText = document.getElementById('textInput').value.toLowerCase();
    const waveElements = document.querySelectorAll('.wave');
    const inputRect = document.getElementById('textInput').getBoundingClientRect();
    const inputCenterX = inputRect.left + inputRect.width / 2;
    const inputCenterY = inputRect.top + inputRect.height / 2;

    // Clear previous letter positions and animations
    waveElements.forEach((element) => {
        element.classList.remove('moving-to-input'); // Remove any previous animation classes
        element.style.transition = 'none';
        element.style.transform = '';
        element.style.opacity = '1';
        element.style.animation = 'none'; // Stop the wave animation
    });

    // Move specified letters to input field
    const letters = inputText.split('');
    letters.forEach((letter) => {
        const waveLetter = Array.from(waveElements).find((el) => el.textContent.toLowerCase() === letter);
        if (waveLetter) {
            const rect = waveLetter.getBoundingClientRect();
            const offsetX = inputCenterX - (rect.left + rect.width / 2);
            const offsetY = inputCenterY - (rect.top + rect.height / 2);
            waveLetter.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            waveLetter.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0)`;
            waveLetter.style.opacity = '0';
            waveLetter.classList.add('moving-to-input');
        }
    });

    // Change background color
    document.body.style.backgroundColor = inputText;

    // Reset letters back to original position and reapply animation after 2 seconds
    setTimeout(() => {
        waveElements.forEach((element) => {
            element.style.transition = 'none'; // Disable transition
            element.style.transform = '';
            element.style.opacity = '1';
            element.classList.remove('moving-to-input');
            void element.offsetWidth; // Trigger reflow to restart the animation
            element.style.animation = ''; // Restart the wave animation
        });

        // Reapply wave animation with delay
        waveElements.forEach((element, index) => {
            element.style.animation = `wave 3s cubic-bezier(0.42, 0, 0.58, 1) infinite`;
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }, 2000);
});