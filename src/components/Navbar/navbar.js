import { LitElement, html, css } from 'lit';
import "../Form/form.js";
import { LanguageController }  from '../../utils/languageController.js';

class NavbarComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #ffffff;
      padding: 10px 10px;
      margin: 20px;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      font-size: 20px;
    }
    .logo img {
      height: 20px;
      margin-right: 10px;
    }
    .menu {
      display: flex;
      gap: 15px;
    }
    button {
      border: none;
      background: none;
      color: #f16522;
      cursor: pointer;
      font-size: 16px;
    }
    .add-btn {
      color: #f16522;
      padding: 5px 10px;
      border-radius: 5px;
    }
  `;

  static properties = {
    showAddModal: { type: Boolean },
    templateItem: { type: Object },
    currentLang: { type: String },
  };

  constructor() {
    super();
    this.languageController = new LanguageController(this);
    this.showAddModal = false;
    this.templateItem = {};
    this.currentLang = document.documentElement.lang || 'en';
  }

  openAddModal() {
    this.showAddModal = true;
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'tr' : 'en';
    document.documentElement.lang = this.currentLang; // Update the <html> lang attribute
    this.requestUpdate();
    // Show a confirmation message
    //alert(`Language changed to: ${document.documentElement.lang === 'en' ? 'English 🇬🇧' : 'Türkçe 🇹🇷'}`);
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  handleAdd(event) {
    this.dispatchEvent(new CustomEvent('add',{ detail: event.detail, bubbles: true, composed: true }));
    this.closeAddModal();
  }


  render() {
    return html`
      <div class="navbar">
        <div class="logo">
          <img src="logo.png" alt="Logo">
          ING
        </div>
        <div class="menu">
          <button>👥 ${this.languageController.t('employees')}</button>
          <button class="add-btn" @click="${() => this.openAddModal()}">+ ${this.languageController.t('addNew')}</button>
          <button class="lang-btn" @click="${() => this.switchLanguage()}">${this.currentLang === 'en' ? '🇹🇷' : '🇬🇧'}</button>
        </div>
      </div>
       ${this.showAddModal ? html`
        <form-component
          .item="${this.templateItem}"
          status="add"
          title=${this.languageController.t('addEmployee')} 
          @confirm="${this.handleAdd}" 
          @cancel="${this.closeAddModal}">
        </form-component>
      ` : ''}
    `;
  }

  openEditModal() {
    this.showAddModal = true;
  }
}

customElements.define('navbar-component', NavbarComponent);
