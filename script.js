// --- 1. Custom Cursor Logic (Updated) ---
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot mengikuti mouse langsung
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline mengikuti dengan sedikit delay (efek floating)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Efek hover pada elemen interaktif
// UPDATE: Menambahkan .activity-card, .theme-btn, dan link dropdown ke target cursor
const interactiveElements = document.querySelectorAll('a, button, .cyber-card, .activity-card, .theme-btn, .dropdown-content a');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
        // Ubah warna cursor jika sedang di light mode agar terlihat
        if (document.body.classList.contains('light-mode')) {
             cursorOutline.style.borderColor = '#008c94';
             cursorOutline.style.backgroundColor = 'rgba(0, 140, 148, 0.1)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.backgroundColor = 'transparent';
        // Reset warna cursor ke default
        cursorOutline.style.borderColor = ''; 
    });
});


// --- 2. Advanced Typing Effect ---
const textElement = document.getElementById('typing-text');
const phrases = [
    "INFORMATION SYSTEM STUDENT", 
    "WEB DEVELOPER", 
    "SYSTEM ANALYST"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    // Cek jika elemen ada untuk mencegah error
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.innerText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.innerText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause saat selesai ngetik
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start Typing saat halaman dimuat
document.addEventListener('DOMContentLoaded', typeEffect);


// --- 3. Reveal on Scroll ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// UPDATE: Menambahkan .activity-card agar kartu activities juga punya animasi scroll
document.querySelectorAll('.cyber-section, .cyber-card, .activity-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});


// --- 4. THEME SWITCHER LOGIC (NEW) ---
const darkBtn = document.getElementById('mode-dark');
const lightBtn = document.getElementById('mode-light');
const body = document.body;

// Fungsi helper untuk update UI cursor saat ganti tema
function updateCursorColor(isLight) {
    if (isLight) {
        cursorDot.style.backgroundColor = '#008c94'; // Cyan gelap
        cursorOutline.style.borderColor = '#008c94';
    } else {
        cursorDot.style.backgroundColor = '#00f3ff'; // Cyan neon default
        cursorOutline.style.borderColor = '#00f3ff';
    }
}

if (lightBtn && darkBtn) {
    // Klik Light Mode
    lightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateCursorColor(true);
    });

    // Klik Dark Mode
    darkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        updateCursorColor(false);
    });
}

// Cek Local Storage saat pertama kali load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateCursorColor(true);
}