import { LitElement, html, css } from 'lit';

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

    label {
    width: 100px; 
    text-align: right; 
    }

    input {
    flex: 1; 
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    }

    .update-btn {
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
    item: { type: Object }
  };

  constructor() {
    super();
    this.item = { id: '1', name: 'Ali', email: 'gmail', position: '123' };
  }

  render() {
    if (!this.item) return html``;
    return html`
      <div class="modal">
      <div class="modal-content">
          <h2>Edit Employee</h2>
          ${Object.entries(this.item).map(
            ([key, value]) => html`
            <div class="form-group">
              <label>${key}</label>
              <input 
                type="text" 
                .value="${value}" 
                @input="${e => this.updateField(key, e)}" 
                placeholder="${key}" />
                </div>
            `
          )}
          <button class="update-btn" @click="${this.saveChanges}">Update</button>
          <button class="cancel-btn" @click="${this.closeModal}">Cancel</button>
        </div>
      </div>
    `;
  }

  updateField(field, event) {
    this.employee = { ...this.employee, [field]: event.target.value };
  }

  saveChanges() {
    this.dispatchEvent(new CustomEvent('update-employee', { detail: this.employee, bubbles: true, composed: true }));
    this.closeModal();
  }

  openModal(employee) {
    this.employee = { ...employee };
  }
}

customElements.define('form-component', Form);
