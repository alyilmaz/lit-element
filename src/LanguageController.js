import { translations } from '../translations.js';

class LanguageController {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
    this.language = document.documentElement.lang || 'en'; // Read lang from <html>
    this._observer = new MutationObserver(() => this.updateLanguage());
    this._observer.observe(document.documentElement, { attributes: true });
  }

  t(key) {
    return translations[this.language][key] || key;
  }

  updateLanguage() {
    this.language = document.documentElement.lang || 'en';
    this.host.requestUpdate(); // Re-render component
  }

  disconnect() {
    this._observer.disconnect();
  }
}

export { LanguageController };
