/**
 * ================================================================
 * FORM.JS - PLOMBERIE MARTIN
 * Gestion du formulaire de contact et redirection WhatsApp
 * ================================================================
 */

// ========================================
// CONFIGURATION
// ========================================

// Numéro WhatsApp (format international sans le +)
// Format: 33XXXXXXXXX (pour la France, enlever le 0 et mettre 33)
const WHATSAPP_NUMBER = '33111111111'; // Remplacer par le vrai numéro


// ========================================
// GESTION DU FORMULAIRE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('devis-form');
    
    if (!form) {
        console.warn('Formulaire de contact non trouvé sur cette page');
        return;
    }
    
    // Écouteur d'événement sur la soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêcher l'envoi classique du formulaire
        
        // Récupérer les valeurs des champs
        const nom = document.getElementById('nom').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const email = document.getElementById('email').value.trim();
        const ville = document.getElementById('ville').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation des champs
        if (!validateForm(nom, telephone, ville, service, message)) {
            return; // Arrêter si validation échoue
        }
        
        // Formater le message WhatsApp
        const whatsappMessage = formatWhatsAppMessage(
            nom, 
            telephone, 
            email, 
            ville, 
            service, 
            message
        );
        
        // Créer l'URL WhatsApp
        const whatsappURL = createWhatsAppURL(whatsappMessage);
        
        // Afficher un message de confirmation (optionnel)
        showSuccessMessage();
        
        // Rediriger vers WhatsApp après un court délai
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 500);
        
        // Optionnel: Réinitialiser le formulaire après envoi
        // form.reset();
    });
});


// ========================================
// VALIDATION DU FORMULAIRE
// ========================================

function validateForm(nom, telephone, ville, service, message) {
    
    // Validation du nom
    if (!nom || nom.length < 2) {
        showError('Veuillez entrer un nom valide (minimum 2 caractères)');
        document.getElementById('nom').focus();
        return false;
    }
    
    // Validation du téléphone
    const phoneRegex = /^[\d\s\.\-\+\(\)]{10,}$/;
    if (!telephone || !phoneRegex.test(telephone)) {
        showError('Veuillez entrer un numéro de téléphone valide (10 chiffres minimum)');
        document.getElementById('telephone').focus();
        return false;
    }
    
    // Validation de la ville
    if (!ville || ville.length < 2) {
        showError('Veuillez entrer une ville valide');
        document.getElementById('ville').focus();
        return false;
    }
    
    // Validation du service
    if (!service || service === '') {
        showError('Veuillez sélectionner un type de prestation');
        document.getElementById('service').focus();
        return false;
    }
    
    // Validation du message
    if (!message || message.length < 10) {
        showError('Veuillez décrire votre besoin (minimum 10 caractères)');
        document.getElementById('message').focus();
        return false;
    }
    
    return true;
}


// ========================================
// FORMATAGE DU MESSAGE WHATSAPP
// ========================================

function formatWhatsAppMessage(nom, telephone, email, ville, service, message) {
    
    let whatsappText = `🔧 *NOUVELLE DEMANDE DE DEVIS*\n\n`;
    
    whatsappText += `👤 *Nom :* ${nom}\n`;
    whatsappText += `📞 *Téléphone :* ${telephone}\n`;
    
    if (email && email !== '') {
        whatsappText += `📧 *Email :* ${email}\n`;
    }
    
    whatsappText += `📍 *Ville :* ${ville}\n`;
    whatsappText += `🔧 *Service demandé :* ${service}\n\n`;
    whatsappText += `💬 *Message :*\n${message}\n\n`;
    whatsappText += `---\n`;
    whatsappText += `_Demande envoyée depuis le site Plomberie Martin_`;
    
    return whatsappText;
}


// ========================================
// CRÉATION DE L'URL WHATSAPP
// ========================================

function createWhatsAppURL(message) {
    
    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Créer l'URL WhatsApp
    // Format: https://wa.me/NUMERO?text=MESSAGE
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    return whatsappURL;
}


// ========================================
// AFFICHAGE DES MESSAGES
// ========================================

// Message d'erreur
function showError(errorMessage) {
    
    // Vérifier si un message d'erreur existe déjà
    let errorDiv = document.querySelector('.form-error-message');
    
    if (!errorDiv) {
        // Créer le div d'erreur s'il n'existe pas
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        
        const form = document.getElementById('devis-form');
        form.insertBefore(errorDiv, form.firstChild);
        
        // Ajouter les styles
        addErrorStyles();
    }
    
    // Afficher le message d'erreur
    errorDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>${errorMessage}</span>
    `;
    
    errorDiv.style.display = 'flex';
    
    // Scroll vers le message d'erreur
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}


// Message de succès
function showSuccessMessage() {
    
    // Vérifier si un message de succès existe déjà
    let successDiv = document.querySelector('.form-success-message');
    
    if (!successDiv) {
        // Créer le div de succès s'il n'existe pas
        successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        
        const form = document.getElementById('devis-form');
        form.insertBefore(successDiv, form.firstChild);
        
        // Ajouter les styles
        addSuccessStyles();
    }
    
    // Afficher le message de succès
    successDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Parfait ! Redirection vers WhatsApp en cours...</span>
    `;
    
    successDiv.style.display = 'flex';
    
    // Scroll vers le message de succès
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}


// ========================================
// STYLES POUR LES MESSAGES
// ========================================

function addErrorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-error-message {
            display: none;
            align-items: center;
            gap: 0.8rem;
            padding: 1rem 1.5rem;
            background-color: #fee;
            border: 2px solid #dc3545;
            border-radius: 8px;
            color: #dc3545;
            font-weight: 600;
            margin-bottom: 1.5rem;
            animation: slideDown 0.3s ease;
        }
        
        .form-error-message svg {
            flex-shrink: 0;
            stroke: #dc3545;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function addSuccessStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-success-message {
            display: none;
            align-items: center;
            gap: 0.8rem;
            padding: 1rem 1.5rem;
            background-color: #d4edda;
            border: 2px solid #28a745;
            border-radius: 8px;
            color: #155724;
            font-weight: 600;
            margin-bottom: 1.5rem;
            animation: slideDown 0.3s ease;
        }
        
        .form-success-message svg {
            flex-shrink: 0;
            stroke: #28a745;
        }
    `;
    document.head.appendChild(style);
}


// ========================================
// AUTO-FORMATAGE DU NUMÉRO DE TÉLÉPHONE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const phoneInput = document.getElementById('telephone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Enlever tous les caractères non numériques sauf espaces
            let value = e.target.value.replace(/[^\d\s]/g, '');
            
            // Formater au format français : XX XX XX XX XX
            if (value.length > 0) {
                value = value.replace(/\s/g, ''); // Enlever les espaces
                const formatted = value.match(/.{1,2}/g)?.join(' ') || value;
                e.target.value = formatted.substring(0, 14); // Max 14 caractères (10 chiffres + 4 espaces)
            }
        });
    }
});


// ========================================
// COMPTEUR DE CARACTÈRES POUR LE MESSAGE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const messageField = document.getElementById('message');
    
    if (messageField) {
        // Créer le compteur
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.9rem;
            color: #666;
            margin-top: 0.3rem;
        `;
        
        messageField.parentElement.appendChild(counter);
        
        // Fonction pour mettre à jour le compteur
        function updateCounter() {
            const length = messageField.value.length;
            const minLength = 10;
            
            if (length < minLength) {
                counter.textContent = `${length}/${minLength} caractères minimum`;
                counter.style.color = '#dc3545';
            } else {
                counter.textContent = `${length} caractères`;
                counter.style.color = '#28a745';
            }
        }
        
        // Mettre à jour au chargement et à chaque saisie
        updateCounter();
        messageField.addEventListener('input', updateCounter);
    }
});


// ========================================
// DÉTECTION ET PRÉ-REMPLISSAGE (OPTIONNEL)
// ========================================

// Fonction pour pré-remplir le service si passé en paramètre URL
document.addEventListener('DOMContentLoaded', function() {
    
    const serviceSelect = document.getElementById('service');
    
    if (serviceSelect) {
        // Récupérer le paramètre "service" de l'URL si présent
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        if (serviceParam) {
            // Chercher l'option correspondante
            const options = serviceSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value.toLowerCase() === serviceParam.toLowerCase()) {
                    option.selected = true;
                }
            });
        }
    }
});


// ========================================
// FONCTION DE TEST (DÉVELOPPEMENT)
// ========================================

// Fonction pour tester le formulaire sans vraiment envoyer
function testWhatsAppMessage() {
    const testMessage = formatWhatsAppMessage(
        'Jean Dupont',
        '06 12 34 56 78',
        'jean.dupont@email.fr',
        'Lyon 3ème',
        'Dépannage urgence',
        'J\'ai une fuite d\'eau dans ma cuisine, pouvez-vous intervenir rapidement ?'
    );
    
    console.log('=== TEST MESSAGE WHATSAPP ===');
    console.log(testMessage);
    console.log('=== URL WHATSAPP ===');
    console.log(createWhatsAppURL(testMessage));
    
    return testMessage;
}

// Pour tester dans la console: testWhatsAppMessage()


// ========================================
// LOG DE DÉMARRAGE
// ========================================

console.log('%c📱 Form.js chargé - Redirection WhatsApp prête', 'color: #25D366; font-size: 12px; font-weight: bold;');
console.log('%cNuméro WhatsApp configuré: ' + WHATSAPP_NUMBER, 'color: #666; font-size: 11px;');