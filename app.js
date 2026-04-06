async function loadLanguage(lang) {
  const response = await fetch(`${lang}.json`);
  const data = await response.json();

  Object.keys(data).forEach(key => {
    const el = document.getElementById(key);
    if(el){
      if(el.tagName === "INPUT" || el.tagName === "TEXTAREA"){
        el.placeholder = data[key];
      } else if(el.tagName === "IMG"){
        el.alt = data[key];
        el.title = data[key];
      } else {
        el.textContent = data[key];
      }
    }
  });
}

loadLanguage("en");
