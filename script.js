// Messages for the "No" button
const messages = [
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Would you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart 💔"
];

let messageIndex = 0;
let yesClickCount = 0;
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const confettiContainer = document.createElement('div');
confettiContainer.className = 'confetti-container';
document.body.appendChild(confettiContainer);

// Create floating hearts
function createFloatingHearts() {
    const container = document.createElement('div');
    container.className = 'floating-hearts';
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(heart);
    }
    
    document.body.appendChild(container);
}

// Create sparkles
function createSparkles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
        sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
        sparkle.style.animationDelay = `${Math.random()}s`;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Create confetti explosion
function createConfetti() {
    confettiContainer.style.display = 'block';
    confettiContainer.innerHTML = '';
    
    const colors = ['#ff0000', '#ff4d4d', '#ff6666', '#ff9999', '#ffffff'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = '1';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const animation = confetti.animate([
            { 
                top: '-20px',
                transform: `rotate(${Math.random() * 360}deg) scale(0)`
            },
            { 
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.8 + 0.2})`
            }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)'
        });
        
        confettiContainer.appendChild(confetti);
        
        animation.onfinish = () => confetti.remove();
    }
}

// Initialize decorations
createFloatingHearts();

// Event listeners
yesButton.addEventListener('click', handleYesClick);
noButton.addEventListener('click', handleNoClick);
yesButton.addEventListener('mouseenter', () => createSparkles(yesButton));
noButton.addEventListener('mouseenter', () => createSparkles(noButton));

// Add keyboard event listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'y' || e.key === 'Y') {
        handleYesClick();
    } else if (e.key === 'n' || e.key === 'N') {
        handleNoClick();
    }
});

function handleNoClick() {
    // Add shake animation to container
    const container = document.querySelector('.container');
    container.style.animation = 'shake 0.5s';
    setTimeout(() => {
        container.style.animation = '';
    }, 500);
    
    // Change the text of the "No" button
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Increase the size of the "Yes" button
    const currentSize = parseInt(window.getComputedStyle(yesButton).fontSize);
    const newSize = currentSize * 1.5;
    yesButton.style.fontSize = `${newSize}px`;
    
    // Store text for glitch effect
    yesButton.setAttribute('data-text', yesButton.textContent);
    
    // Check if text is overflowing
    const isOverflowing = yesButton.scrollWidth > yesButton.clientWidth;
    
    // Apply glitch effect if text overflows
    if (isOverflowing || newSize > 40) {
        yesButton.classList.add('glitching');
        yesButton.style.padding = '20px 30px'; // Reduce padding to emphasize overflow
        
        // Add random glitch effects
        const glitchInterval = setInterval(() => {
            yesButton.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            yesButton.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        }, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            yesButton.style.transform = '';
            yesButton.style.color = '';
        }, 1000);
    }
    
    // Create explosion of small hearts around "No" button
    const rect = noButton.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💔';
        heart.style.position = 'absolute';
        heart.style.left = `${rect.left + rect.width / 2}px`;
        heart.style.top = `${rect.top + rect.height / 2}px`;
        heart.style.fontSize = '20px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
    }
    
    // Optional: Add some visual feedback
    noButton.style.animation = 'none';
    setTimeout(() => {
        noButton.style.animation = 'wiggle 0.5s';
    }, 10);
    
    createSparkles(noButton);
}

function handleYesClick() {
    yesClickCount++;
    
    if (yesClickCount === 1) {
        // First click - celebration
        createConfetti();
        createSparkles(yesButton);
        
        // Add celebration animation
        yesButton.style.animation = 'celebrate 0.8s ease, yesPulse 0.5s infinite';
        
        // Change text to be more excited
        setTimeout(() => {
            yesButton.textContent = "YES! 💖";
        }, 300);
        
        // Wait for celebration then redirect
        setTimeout(() => {
            window.location.href = "yes_page.html";
        }, 2000);
    } else {
        // Multiple clicks - immediate redirect
        window.location.href = "yes_page.html";
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-8deg); }
        75% { transform: rotate(8deg); }
    }
    
    @keyframes celebrate {
        0% { transform: scale(1); }
        25% { transform: scale(1.3) rotate(-5deg); }
        50% { transform: scale(1.4) rotate(5deg); }
        75% { transform: scale(1.3) rotate(-5deg); }
        100% { transform: scale(1.2) rotate(0deg); }
    }
`;
document.head.appendChild(style);