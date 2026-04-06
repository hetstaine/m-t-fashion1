let currentLang = 'en';

async function loadTranslations(lang) {
  const response = await fetch(`${lang}.json`);
  return await response.json();
}

async function localizePage(lang) {
  const translations = await loadTranslations(lang);

  // TEXT
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.innerText = translations[key];
    }
  });

  // IMAGES
  document.querySelectorAll('[data-i18n-img]').forEach(img => {
    const key = img.getAttribute('data-i18n-img');
    if (translations[key]) {
      img.src = translations[key];
    }
  });

  // ALT TEXT (optional)
  document.querySelectorAll('[alt-key]').forEach(img => {
    const key = img.getAttribute('alt-key');
    if (translations[key]) {
      img.alt = translations[key];
    }
  });
}

// Initial load
localizePage(currentLang);

// Language switcher
document.getElementById('langSwitcher').addEventListener('change', e => {
  currentLang = e.target.value;
  localizePage(currentLang);
});
