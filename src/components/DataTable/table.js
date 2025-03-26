import { LitElement, html, css } from 'lit';
import './pagination.js';
import '../Confirmation/delete-confirmation.js';
import '../Form/form.js';

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
  };

  constructor() {
    super();
    this.data = [];
    this.currentPage = 1;
    this.itemsPerPage = 7;
    this.headers = [];
    this.showDeleteModal = false;
    this.showEditModal = false;
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

  handleEdit(id) {
    alert(`Edit employee with ID: ${id}`);
  }

  changePage(event) {
    this.currentPage = event;
  }

  render() {
    return html`
      <table>
        <tr>
          ${this.headers?.map(header => html`<th>${header}</th>`)}
        </tr>
        ${this.paginatedData.map(item => html`
          <tr>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.employmentDate}</td>
            <td>${item.birthDate}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td>${item.department}</td>
            <td>${item.position}</td>
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
          @confirm="${this.handleEdit}" 
          @cancel="${this.closeEditModal}">
        </form-component>
      ` : ''}
    `;
  }
}

customElements.define('table-component', TableComponent);
