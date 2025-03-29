import { LitElement, html, css } from 'lit';
import { LanguageController }  from '../../utils/languageController.js';

class DeleteConfirmation extends LitElement {
  static styles = css`
     .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      background: white;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
      color: #f16522;
    }

    .modal-header button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #f16522;;
    }

    .modal-body {
      margin: 16px 0;
      font-size: 0.9rem;
      color: #333;
    }

    .modal-footer {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .proceed-btn {
      background: #f16522;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .cancel-btn {
      background: white;
      color: #5a5a5a;
      padding: 10px;
      border: 1px solid #5a5a5a;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  static properties = {
    employee: { type: Object }
  };

  constructor() {
    super();
    this.languageController = new LanguageController(this);
    this.employee = {};
  }

  render() {
    if (!this.employee) return html``;
    return html`
       <div class="modal">
        <div class="modal-header">
          <span>${this.languageController?.t('areYouSure')}</span>
          <button @click=${this._cancel}>✖</button>
        </div>
        <div class="modal-body">
        ${this.languageController?.t('deleteConfirmation')
          .replace("firstName", this.employee.firstName)
          .replace("lastName", this.employee.lastName)}
        </div>
        <div class="modal-footer">
          <button class="proceed-btn" @click="${this._confirm}">${this.languageController?.t('proceed')}</button>
          <button class="cancel-btn" @click="${this._cancel}">${this.languageController?.t('cancel')}</button>
        </div>
      </div>
    `;
  }

  _confirm() {
    this.dispatchEvent(new CustomEvent('confirm'));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
}

customElements.define('delete-confirmation', DeleteConfirmation);
