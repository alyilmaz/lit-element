import { LitElement, html, css } from 'lit';
import  './src/components/DataTable/index.js';
import './src/components/Navbar/navbar.js';
import './src/components/menubar/menu-bar.js';

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
  };

  constructor() {
    super();
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
  }


  render() {
    return html`
    <navbar-component></navbar-component>
    <menu-bar title="Employee List"></menu-bar>
    <data-table  .headers="${this.headers}" .data="${this.data}"></data-table>
      `;
  }
}

customElements.define('my-app', MyApp);
