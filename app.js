// Set initial language from localStorage or default to 'en'
let currentLang = localStorage.getItem('lang') || 'en';

async function loadTranslations(lang) {
  const response = await fetch(`./${lang}.json`); // safer relative path
  return await response.json();
}

async function localizePage(lang) {
  const translations = await loadTranslations(lang);

  // TEXT
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.innerText = translations[key];
  });

  // IMAGES
  document.querySelectorAll('[data-i18n-img]').forEach(img => {
    const key = img.getAttribute('data-i18n-img');
    if (translations[key]) img.src = translations[key];
  });

  // ALT TEXT
  document.querySelectorAll('[alt-key]').forEach(img => {
    const key = img.getAttribute('alt-key');
    if (translations[key]) img.alt = translations[key];
  });
}

// Initial load
localizePage(currentLang);

// Language switcher
const langSwitcher = document.getElementById('langSwitcher');
if (langSwitcher) {
  langSwitcher.value = currentLang; // set select to current language
  langSwitcher.addEventListener('change', e => {
    currentLang = e.target.value;
    localStorage.setItem('lang', currentLang);
    localizePage(currentLang);
  });
}
