import { LitElement, html, css } from 'lit';

class MenuBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: 20px;
      font-weight: normal;
      color: #f26722;
    }

    .icons {
      display: flex;
      gap: 15px;
    }

    .icon {
      cursor: pointer;
      color: #f26722;
      font-size: 22px;
    }

    .icon:hover {
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      .title {
        font-size: 18px;
      }
      
      .icon {
        font-size: 20px;
      }
    }
  `;

  static properties = {
    title: { type: String },
  };

  constructor() {
    super();
    this.title = '';
  }

  render() {
    return html`
    <div class="navbar">
    <div class="title">${this.title}</div>
    <div class="icons">
      <span class="icon" id="enableList" @click="${this._enableList}">☰</span>
      <span class="icon" id="enableTable" @click="${this._enableTable}">▦</span>
    </div>
  </div>
  `;
  }

  _enableList() {
    this.dispatchEvent(new CustomEvent('enable-list'));
  }

  _enableTable() {
    this.dispatchEvent(new CustomEvent('enable-table'));
  }
}

customElements.define('menu-bar', MenuBar);
