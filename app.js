import { LitElement, html, css } from 'lit';
import  './src/components/DataTable/index.js';
import './src/components/Navbar/navbar.js';
import './src/components/menubar/menu-bar.js';
import './src/LanguageController.js';

class MyApp extends LitElement {
  static styles = css`
    :host {
       display: flex;
      flex-direction: column;
      height: 100vh;
      background: #f4f4f4;
    }
  `;

  static properties = {
    headers: { type: Array },
    data: { type: Array },
    templateData: { type: Object },
  };

  constructor() {
    super();
    //this.languageController = new LanguageController(this);
    this.headers = ['First Name', 'Last Name', 'Employment Date', 'Birth Date', 'Phone', 'Email', 'Department', 'Position', 'Actions'];
    this.data = Array(50).fill().map((_, i) => ({
      id: i + 1,
      firstName: 'Ahmet',
      lastName: 'Sourtimes',
      employmentDate: '23/09/2022',
      birthDate: '23/09/2022',
      phone: '+90 532 123 45 67',
      email: 'ahmet@sourtimes.org',
      department: 'Analytics',
      position: 'Junior'
    }));
    this.templateData = {
      firstName: '',
      lastName: '',
      employmentDate: '',
      birthDate: '',
      phone: '',
      email: '',
      department: 'Analytics',
      position: 'Junior'
    };
  }

  handleAdd(event) {
    const newEmployee = event.detail;
    this.data = [...this.data, { ...newEmployee, id: this.data.length + 1 }];
  }

  changeLanguage(lang) {
    document.documentElement.lang = lang; // Update the <html> lang attribute
  }


  render() {
    return html`
    <navbar-component .templateItem=${this.templateData} @confirm="${this.handleAdd}" ></navbar-component>
    <menu-bar title="Employee List"></menu-bar>
    <data-table  .headers="${this.headers}" .data="${this.data}"></data-table>
      `;
  }
}

customElements.define('my-app', MyApp);
