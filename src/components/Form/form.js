import { LitElement, html, css } from 'lit';
import { LanguageController }  from '../../utils/languageController.js';

class Form extends LitElement {
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

    .form-group {
      display: flex;
      align-items: center; 
      gap: 10px; 
      margin-bottom: 10px;
    }
      p {
      font-size: 1.5rem;
      color: #f16522;
      margin-bottom: 20px;
      text-align: left;
      }

    label {
    width: 100px; 
    text-align: left;
    padding: 8px; 
    }

    label::first-letter {
      text-transform: uppercase;
    }

    input {
    flex: 1; 
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    }

    select {
      flex: 1;
      font-size: 30px; 
      border-radius: 5px;
    }

    .butons { 
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    button {
      flex: 1;
      margin: 5px; 
    }
    .confirm-btn {
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
    item: { type: Object },
    optionOfPositions: { type: Array },
    optionOfDepartments: { type: Array },
    title: { type: String },
    status: { type: String },
  };

  constructor() {
    super();
    this.languageController = new LanguageController(this);
    this.item = {};
    this.optionOfPositions = ['Junior', 'Medior', 'Senior'];
    this.optionOfDepartments = ['Analytics', 'Tech'];
    this.title = '';
    this.status = '';
  }

  render() {
    if (!this.item) return html``;
    return html`
      <div class="modal">
      <div class="modal-content">
          <p>${this.title}</p>
          ${Object.entries(this.item).map(
            ([key, value]) => html`
              ${key === 'id' ? '' : html`
              <div class="form-group">
                <label>${this.languageController?.t(key) || key}</label>
                ${key === 'position' || key === 'department' ? html`
                    <select id="dropdown" @change="${e =>this.updateField(key, e)}">
                    ${key === 'position' ? html` ${this.optionOfPositions.map(option => html`
                      <option ?selected="${option === this.selectedValue}">${option}</option>
                    `)} `: html`${this.optionOfDepartments.map(option => html`
                      <option ?selected="${option === this.selectedValue}">${option}</option>
                    `)} `}
                    
                  </select>
                `: html`
                <input 
                  type="text" 
                  .value="${value}" 
                  @input="${e => this.updateField(key, e)}" 
                  placeholder="${key}" />
                  </div>
              `}`}`
          )}
          <div class="butons">
          <button class="confirm-btn" @click="${this._confirm}">${this.languageController?.t(this.status)}</button>
          <button class="cancel-btn" @click="${this._cancel}">${this.languageController?.t('cancel')}</button>
          </div>
        </div>
      </div>
    `;
  }

  _confirm() {
    this.dispatchEvent(new CustomEvent('confirm',{ detail: this.item, bubbles: true, composed: true }));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  updateField(field, event) {
    this.item = { ...this.item, [field]: event.target.value };
  }
}

customElements.define('form-component', Form);
