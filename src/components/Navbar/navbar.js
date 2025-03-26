import { LitElement, html, css } from 'lit';

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

  render() {
    return html`
      <div class="navbar">
        <div class="logo">
          <img src="logo.png" alt="Logo">
          ING
        </div>
        <div class="menu">
          <button>👥 Employees</button>
          <button class="add-btn">+ Add New</button>
          <button>🇹🇷</button>
        </div>
      </div>
    `;
  }
}

customElements.define('navbar-component', NavbarComponent);
