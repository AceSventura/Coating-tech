// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Language Selector
  const languageBtn = document.querySelector('.language-btn');
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageOptions = document.querySelectorAll('.language-dropdown a');
  
  // Current language (default: Italian)
  let currentLang = localStorage.getItem('preferredLanguage') || 'it';
  
  // Initialize the site with the saved language or default
  loadLanguage(currentLang);
  
  // Toggle language dropdown
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
  
  // Language selection
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
      alert(translations[currentLang].contact.form.success || 'Message sent successfully!');
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

// Load language translations
async function loadLanguage(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load language file: ${lang}.json`);
    }
    
    const translations = await response.json();
    applyTranslations(translations);
    
    // Update language button text
    const languageBtn = document.querySelector('.language-btn span');
    if (languageBtn) {
      languageBtn.textContent = translations.language[lang];
    }
    
    // Save preferred language
    localStorage.setItem('preferredLanguage', lang);
    currentLang = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
  } catch (error) {
    console.error('Error loading language:', error);
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

// Map is now implemented using an iframe in the HTML