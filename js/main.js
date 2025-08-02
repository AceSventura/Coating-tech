let mobileMenuOpen = false;
let currentLang = localStorage.getItem('preferredLanguage') || 'it';

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    mobileMenuOpen = false;
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Language Selector Desktop
  const languageBtn = document.querySelector('.language-btn');
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageOptions = document.querySelectorAll('.language-dropdown a');
  
  // Initialize the site with the saved language or default
  loadLanguage(currentLang);
  
  // Toggle language dropdown desktop
  if (languageBtn) {
    languageBtn.addEventListener('click', function() {
      languageDropdown.classList.toggle('show');
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.language-selector') && languageDropdown) {
      languageDropdown.classList.remove('show');
    }
  });
  
  // Language selection desktop
  if (languageOptions) {
    languageOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        loadLanguage(lang);
        languageDropdown.classList.remove('show');
      });
    });
  }

  // Language selection mobile - NUOVO CODICE
  document.querySelectorAll('.mobile-language-options a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Rimuovi active da tutte le opzioni mobile
      document.querySelectorAll('.mobile-language-options a').forEach(a => a.classList.remove('active'));
      
      // Aggiungi active alla lingua selezionata
      this.classList.add('active');
      
      // Carica la nuova lingua
      const lang = this.dataset.lang;
      loadLanguage(lang);
      
      // Chiudi il menu mobile dopo un breve delay
      setTimeout(() => {
        closeMobileMenu();
      }, 300);
    });
  });
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      // For demonstration, we'll just log the form data
      const formData = new FormData(contactForm);
      const formValues = {};
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      console.log('Contact Form Submission:', formValues);
      
      // Reset the form
      contactForm.reset();
      alert(translations[currentLang]?.contact?.form?.success || 'Message sent successfully!');
    });
  }
  
  // Quote Form Submission
  const quoteForm = document.getElementById('quoteForm');
  const quoteSuccess = document.querySelector('.quote-success');
  
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(quoteForm);
      const formValues = {};
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      console.log('Quote Request:', formValues);

      // Call external API
      fetch('https://external-api.example.com/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        window.location.href = 'quote-success.html';
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Si è verificato un errore durante l\'invio della richiesta. Riprova più tardi.');
      });

      // Reset the form
      quoteForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// Gestione ESC key per chiudere i menu
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    // Chiudi anche il dropdown desktop se aperto
    const languageDropdown = document.querySelector('.language-dropdown');
    if (languageDropdown && languageDropdown.classList.contains('show')) {
      languageDropdown.classList.remove('show');
    }
  }
});

// Load language translations
async function loadLanguage(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load language file: ${lang}.json`);
    }
    
    const translations = await response.json();
    applyTranslations(translations);
    
    // Update language button text desktop
    const languageBtn = document.querySelector('.language-btn span');
    if (languageBtn) {
      languageBtn.textContent = translations.language[lang];
    }
    
    // Update mobile language selection - evidenzia la lingua attiva
    updateMobileLanguageSelection(lang);
    
    // Save preferred language
    localStorage.setItem('preferredLanguage', lang);
    currentLang = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

// Funzione per aggiornare la selezione lingua mobile
function updateMobileLanguageSelection(lang) {
  // Rimuovi active da tutte le opzioni
  document.querySelectorAll('.mobile-language-options a').forEach(a => {
    a.classList.remove('active');
  });
  
  // Aggiungi active alla lingua corrente
  const activeLanguageLink = document.querySelector(`.mobile-language-options a[data-lang="${lang}"]`);
  if (activeLanguageLink) {
    activeLanguageLink.classList.add('active');
  }
}

// Apply translations to the DOM
function applyTranslations(translations) {
  // Navigation
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    
    let value = translations;
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return;
      }
      value = value[k];
    }
    
    if (typeof value === 'string') {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.getAttribute('placeholder')) {
          element.setAttribute('placeholder', value);
        } else {
          element.value = value;
        }
      } else {
        element.textContent = value;
      }
    }
  });
}

// Elements AOS initialization
document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800, // durata animazioni in ms
      once: true     // anima solo una volta
    });
  }
});

// EmailJS
emailjs.init('TUO_USER_ID');

document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Evita il reload della pagina

      emailjs.sendForm('service_i55fpdj', 'template_3ckf9o8', this)
        .then(function(response) {
          alert('Email inviata con successo!');
        }, function(error) {
          alert('Errore: ' + error.text);
        });
    });