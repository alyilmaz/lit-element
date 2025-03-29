import { LitElement, html, css } from 'lit';
import './pagination.js';
import '../Confirmation/delete-confirmation.js';
import '../Form/form.js';
import { LanguageController }  from '../../utils/languageController.js';

class TableComponent extends LitElement {
  static styles = css`
  :host {
      display: block;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      background-color: #ffffff;
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd; 
      border-right: none; 
    }
    th {
      background-color: #ffffff;
      color: #f16522;
      font-size: 12px;
      font-weight: normal;
      font-family: Arial, sans-serif;
    }
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    button {
      margin: 0 5px;
      padding: 5px 10px;
      border: none;
      cursor: pointer;
    }
    .edit {
      color: blue;
    }
    .delete {
      color: red;
    }
  
    td:nth-child(n+3) {
      color: grey; 
    }

      @media (max-width: 768px) {
      table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
      }
    }
  `;

  static properties = {
    data: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    headers: { type: Array },
    data: { type: Array },
    showDeleteModal: { type: Boolean },
    showEditModal: { type: Boolean },
    isTable: { type: Boolean },
  };

  constructor() {
    super();
    this.languageController = new LanguageController(this);
    this.data = [];
    this.currentPage = 1;
    this.itemsPerPage = 7;
    this.headers = [];
    this.showDeleteModal = false;
    this.showEditModal = false;
    this.isTable = true;
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(start, start + this.itemsPerPage);
  }

  openDeleteModal(item) {
    this.selectedItem = item;
    this.showDeleteModal = true;
  }

  openEditModal(item) {
    this.selectedItem = item;
    this.showEditModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedItem = null;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedItem = null;
  }

  handleDelete() {
    this.data = this.data.filter(emp => emp !== this.selectedItem);
    this.closeDeleteModal();
  }

  handleEdit(event) {
    this.selectedItem = event.detail;
    this.data = this.data.map(emp => emp.id === this.selectedItem.id ? this.selectedItem : emp);
    this.closeEditModal();
  }

  changePage(event) {
    this.currentPage = event;
  }

  render() {
    return html`
      <table>
        <tr>
          ${this.headers?.map(header => html`<th>${this.languageController?.t(header) || header}</th>`)} 
        </tr>
        ${this.paginatedData.map(item => html`
          <tr>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.firstName}</td>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.lastName}</td>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.employmentDate}</td>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.birthDate}</td>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.phone}</td>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.email}</td>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.department}</td>
            <td style="border-right: ${this.isTable ? '1px solid #ddd' : 'none'};">${item.position}</td>
            <td>
              <button class="edit" @click="${() => this.openEditModal(item)}">✏️</button>
              <button class="delete" @click="${() => this.openDeleteModal(item)}">🗑️</button>
            </td>
          </tr>
        `)}
      </table>
      <pagination-component
        .currentPage="${this.currentPage}"
        .totalPages="${this.totalPages}"
        @changePage="${e => this.changePage(e.detail)}">
      </pagination-component>
      ${this.showDeleteModal ? html`
        <delete-confirmation 
          .employee="${this.selectedItem}" 
          @confirm="${this.handleDelete}" 
          @cancel="${this.closeDeleteModal}">
        </delete-confirmation>
      ` : ''}
      ${this.showEditModal ? html`
        <form-component
          .item="${this.selectedItem}" 
          status="update"
          title=${this.languageController?.t('updateTitle')}
          @confirm="${this.handleEdit}" 
          @cancel="${this.closeEditModal}">
        </form-component>
      ` : ''}
    `;
  }
}

customElements.define('table-component', TableComponent);
