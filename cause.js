 // Reasons database
 const reasons = [
    { 
        text: "Happy Valentine Mbull, Tidaa Terasa Yaa Kitaa Sudahh Kenal Selama Inii💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "Dari Awalnya Yang Cuma Bareng Pas Rapat, Gak Tau Kenapa Jadii Nyamann Sama Mbull. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "Aku Tuu Sayanggg Bangett Sama Mbulll, tapiii akuu tidaa beranii ucapinn ituu ke mbull. ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Karena Akuu Tauu Mbull Tida Boleh Pacaran Sama Mamaa, Kemarin Pas Bu Riska Ngasih Tau Chat Mama, Akuu Sedih Bingung Harus Apaa. Aku Ada Niat Buat Jauhin Mbul, Tapii Akuu Tidaa Bisaa, Aku Juga Takut Kalau Mbull Dimarahin Mama Kalau Ketauan. ❤ ", 
        emoji: "💕",
        gif: "gif2.gif"
    },
    { 
        text: "Maafinn Akuu Yaa Kalo Sering Buat Mbull Marahh, Terus Sering Foto Mbull Jugaa. Nantii Kamuu Hapus Sajaa Foto Foto Yang Mauu Kamuu Hapuss Yaaa Mbulll. 💖 ", 
        emoji: "💕",
        gif: "gif2.gif"
    },
    { 
        text: "Mungkinn Kita Hanya Bisa Sebatas Teman Pulang Bareng Sajaa, Dan Aku Berusaha Menurunkan Espektasi Akuu Demii Kebaikann Mbulll. Terimakasihh Yaa Mbull Untuk Selama Inii, Karena Kamu Aku Merasa Punya Kehidupan Baruu. I LOVE U ASSYFA. 💖 ", 
        emoji: "💕",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);