/* =========================================
   1. CONFIGURAÇÕES E INICIALIZAÇÃO
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar animação de escrita
    setTimeout(typeText, 1000);
    
    // Configurar tema inicial
    initTheme();

    // Observador para animações de scroll (Fade in)
    setupIntersectionObserver();

    // Efeito de digitação no cursor do terminal
    setupTerminalCursor();

    // Inicializar listeners de cliques
    setupEventListeners();
});

/* =========================================
   2. NAVEGAÇÃO E SCROLL
   ========================================= */
// Header com fundo ao fazer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Efeito Parallax suave
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if(heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Smooth Scroll para links internos
function setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Intersection Observer para animações de entrada
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* =========================================
   3. SISTEMA DE IDIOMAS
   ========================================= */
let currentLanguage = localStorage.getItem('preferredLanguage') || 'pt';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
    
    // Atualizar textos estáticos
    document.querySelectorAll('[data-en][data-pt]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) element.textContent = text;
    });
    
    // Reiniciar animação de escrita com novo idioma
    restartTypingAnimation();
    
    // Esconder o overlay de seleção
    const overlay = document.getElementById('languageOverlay');
    if(overlay) {
        overlay.classList.add('hidden');
        setTimeout(() => { overlay.style.display = 'none'; }, 500);
    }
}

/* =========================================
   4. SISTEMA DE TEMAS (DARK/LIGHT)
   ========================================= */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeToggle = document.getElementById('themeToggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Animação do botão
            themeToggle.style.transform = 'scale(0.8)';
            setTimeout(() => { themeToggle.style.transform = 'scale(1)'; }, 150);
        });

        // Mostrar botão com animação
        setTimeout(() => {
            themeToggle.style.opacity = '1';
            themeToggle.style.transform = 'scale(1)';
        }, 1000);
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

/* =========================================
   5. ANIMAÇÃO DE ESCRITA (HERO)
   ========================================= */
let currentLine = 0;
let currentChar = 0;
let isDeleting = false;

function getTypingTexts() {
    const texts = [];
    for(let i = 1; i <= 3; i++) {
        const element = document.getElementById(`line${i}`);
        if(element) {
            const text = element.getAttribute(`data-${currentLanguage}`);
            if(text) texts.push(text);
        }
    }
    return texts;
}

function typeText() {
    const texts = getTypingTexts();
    if (currentLine < texts.length) {
        const line = document.getElementById(`line${currentLine + 1}`);
        const text = texts[currentLine];
        
        if (line && currentChar <= text.length) {
            line.style.opacity = '1';
            line.innerHTML = text.substring(0, currentChar) + '<span class="cursor"></span>';
            currentChar++;
            
            let speed = Math.random() * 50 + 30; // Mais rápido um pouco
            if (text[currentChar - 1] === ' ') speed = 150;
            setTimeout(typeText, speed);
        } else {
            if(line) line.innerHTML = text; // Remove cursor fixo
            currentLine++;
            currentChar = 0;
            if (currentLine < texts.length) setTimeout(typeText, 300);
        }
    }
}

function restartTypingAnimation() {
    currentLine = 0;
    currentChar = 0;
    for(let i = 1; i <= 3; i++) {
        const line = document.getElementById(`line${i}`);
        if(line) {
            line.innerHTML = '';
            line.style.opacity = '0';
        }
    }
    setTimeout(typeText, 100);
}

/* =========================================
   6. FUNCIONALIDADES DOS PROJETOS E CV
   ========================================= */
function showCVOptions(event) {
    event.preventDefault();
    const options = document.getElementById('cv-options');
    if(options) {
        options.style.display = options.style.display === 'none' ? 'block' : 'none';
    }
}      

function downloadCV(lang) {
    let file = lang === 'en' ? 'Carolina_Machado_CV_EN.pdf' : 'Carolina_Machado_CV.pdf';
    const link = document.createElement('a');
    link.href = 'assets/doc/' + file;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    document.getElementById('cv-options').style.display = 'none';
}

/* =========================================
   7. SKILLS INTERATIVAS
   ========================================= */
function showSkillDetails(skillType) {
    const skillMessages = {
        // ... (Mantém as tuas mensagens originais aqui se quiseres, ou usa a genérica abaixo)
    };

    console.log(`> accessing module: ${skillType}...`);
    
    // Efeito visual no clique
    const pill = event.currentTarget;
    pill.style.transform = 'scale(0.95)';
    setTimeout(() => { pill.style.transform = 'scale(1)'; }, 150);
}

function setupTerminalCursor() {
    const commands = [
        "npm install cybersecurity-tools",
        "git commit -m 'Mastering Python'",
        "analyzing network traffic...",
        "compiling unity project...",
        "docker run portfolio:latest"
    ];
    
    const terminalCommand = document.querySelector('.terminal-command');
    if (!terminalCommand) return;

    // Lógica simples para mudar o texto aleatório do fundo do terminal
    setInterval(() => {
        const randomCmd = commands[Math.floor(Math.random() * commands.length)];
        const cursorSpan = terminalCommand.querySelector('.cursor');
        if(cursorSpan) {
             // Apenas um efeito visual simples para não sobrecarregar
        }
    }, 5000);
}