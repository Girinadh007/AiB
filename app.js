// Laser Generator
const container = document.getElementById('laser-container');
if (container) {
    setInterval(() => {
        const laser = document.createElement('div');
        laser.className = 'laser';
        laser.style.left = Math.random() * 100 + 'vw';
        laser.style.animationDuration = Math.random() * 2 + 1 + 's';
        container.appendChild(laser);
        setTimeout(() => laser.remove(), 3000);
    }, 200);
}

// Countdown Timer Logic
const countdownDate = new Date("Jan 25, 2026 09:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}, 1000);