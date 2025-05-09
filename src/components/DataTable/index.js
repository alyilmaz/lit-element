import { LitElement, html, css } from 'lit';
import './table.js';

class TableComponent extends LitElement {
  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
    h2 {
      color: orange;
    }  
  `;

  static properties = {
    headers: { type: Array },
    data: { type: Array },
    title: { type: String },
    isTable: { type: Boolean },
    itemsPerPage: { type: Number },
  };

  constructor() {
    super();
    this.headers = [];
    this.data = []; 
    this.title = ''; 
    this.isTable = true;
  }

  render() {
    return html`
      <table-component .headers="${this.headers}" .data="${this.data}" .isTable="${this.isTable}" .itemsPerPage="${this.itemsPerPage}"></table-component>
    `;
  }
}

customElements.define('data-table', TableComponent);
