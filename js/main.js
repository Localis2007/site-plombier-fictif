/**
 * ================================================================
 * MAIN.JS - PLOMBERIE MARTIN
 * Gestion des interactions générales du site
 * ================================================================
 */

// ========================================
// 1. MENU MOBILE (BURGER MENU)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (burgerMenu && navLinks) {
        // Toggle du menu mobile
        burgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            
            // Animation du burger (transformation en X)
            const spans = burgerMenu.querySelectorAll('span');
            if (burgerMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
                
                const spans = burgerMenu.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
                
                const spans = burgerMenu.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});


// ========================================
// 2. SMOOTH SCROLL POUR LES ANCRES
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou juste "#"
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const headerOffset = 80; // Hauteur du header sticky
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ========================================
// 3. HEADER STICKY - CHANGEMENT DE STYLE AU SCROLL
// ========================================

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Ajouter une classe quand on scroll
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});


// ========================================
// 4. ANIMATION AU SCROLL (FADE IN)
// ========================================

// Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

// Éléments à animer au scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll(
        '.service-card, .valeur-card, .avantage-card, ' +
        '.temoignage-card, .certification-card, .stat-card, ' +
        '.service-detail, .faq-item, .etape'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Classe CSS pour l'animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);


// ========================================
// 5. BOUTON TÉLÉPHONE FLOTTANT (MOBILE)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Créer le bouton flottant uniquement sur mobile
    if (window.innerWidth <= 768) {
        const floatingBtn = document.createElement('a');
        floatingBtn.href = 'tel:0111111111';
        floatingBtn.className = 'floating-phone-btn';
        floatingBtn.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        `;
        document.body.appendChild(floatingBtn);
        
        // Ajouter les styles pour le bouton flottant
        const floatingBtnStyle = document.createElement('style');
        floatingBtnStyle.textContent = `
            .floating-phone-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #1e3c72, #2a5298);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 5px 20px rgba(30, 60, 114, 0.4);
                z-index: 999;
                transition: all 0.3s ease;
                animation: pulse-phone 2s ease-in-out infinite;
            }
            
            .floating-phone-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 30px rgba(30, 60, 114, 0.6);
            }
            
            .floating-phone-btn svg {
                stroke: white;
            }
            
            @keyframes pulse-phone {
                0%, 100% {
                    box-shadow: 0 5px 20px rgba(30, 60, 114, 0.4);
                }
                50% {
                    box-shadow: 0 5px 30px rgba(255, 215, 0, 0.6);
                }
            }
            
            /* Masquer le bouton quand on scroll tout en haut */
            .floating-phone-btn.hidden {
                opacity: 0;
                pointer-events: none;
            }
        `;
        document.head.appendChild(floatingBtnStyle);
        
        // Masquer/afficher selon le scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                floatingBtn.classList.remove('hidden');
            } else {
                floatingBtn.classList.add('hidden');
            }
        });
    }
});


// ========================================
// 6. DÉTECTION DE LA PAGE ACTIVE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});


// ========================================
// 7. VALIDATION SIMPLE DU FORMULAIRE (OPTIONNEL)
// ========================================

// Cette fonction peut être utilisée avant l'envoi via WhatsApp
function validateContactForm() {
    const nom = document.getElementById('nom')?.value.trim();
    const telephone = document.getElementById('telephone')?.value.trim();
    const ville = document.getElementById('ville')?.value.trim();
    const service = document.getElementById('service')?.value;
    const message = document.getElementById('message')?.value.trim();
    
    // Vérifications basiques
    if (!nom || nom.length < 2) {
        alert('Veuillez entrer un nom valide');
        return false;
    }
    
    if (!telephone || telephone.length < 10) {
        alert('Veuillez entrer un numéro de téléphone valide');
        return false;
    }
    
    if (!ville || ville.length < 2) {
        alert('Veuillez entrer une ville valide');
        return false;
    }
    
    if (!service) {
        alert('Veuillez sélectionner un type de prestation');
        return false;
    }
    
    if (!message || message.length < 10) {
        alert('Veuillez décrire votre besoin (minimum 10 caractères)');
        return false;
    }
    
    return true;
}


// ========================================
// 8. LOADER LORS DU CHARGEMENT DE LA PAGE (OPTIONNEL)
// ========================================

window.addEventListener('load', function() {
    // Masquer le loader si vous en avez un
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Ajouter une classe au body pour indiquer que tout est chargé
    document.body.classList.add('loaded');
});


// ========================================
// 9. GESTION DES ERREURS D'IMAGES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Si une image ne charge pas, on peut mettre une image par défaut
            console.warn('Image failed to load:', this.src);
            // Optionnel: remplacer par une image placeholder
            // this.src = 'path/to/placeholder.jpg';
        });
    });
});


// ========================================
// 10. UTILITAIRES
// ========================================

// Fonction pour formater un numéro de téléphone
function formatPhoneNumber(phone) {
    // Enlever tous les espaces et caractères non numériques
    const cleaned = phone.replace(/\D/g, '');
    
    // Format français : XX XX XX XX XX
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    
    return phone;
}

// Fonction pour détecter si on est sur mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Fonction pour scroller en haut de la page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Exporter les fonctions utilitaires si besoin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateContactForm,
        formatPhoneNumber,
        isMobile,
        scrollToTop
    };
}


// ========================================
// 11. LOG DE DÉMARRAGE (DÉVELOPPEMENT)
// ========================================

console.log('%c🔧 Plomberie Martin - Site Web', 'color: #1e3c72; font-size: 16px; font-weight: bold;');
console.log('%cSite développé par votre agence web', 'color: #666; font-size: 12px;');
console.log('%cToutes les fonctionnalités JavaScript sont chargées ✓', 'color: #28a745; font-size: 12px;');