import { LitElement, html, css } from 'lit';

class PaginationComponent extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: Arial, sans-serif;
      width: 100%;
      color: grey;  
    }
    .page {
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    .active {
      background-color: #f16522;
      border-radius: 50%;
      color: white;
    }
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number }
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
  }

  handlePageClick(page) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.dispatchEvent(new CustomEvent('changePage', { detail: this.currentPage }));
        }
  }

  render() {
    let pages = [];
    if (this.totalPages <= 5) {
      pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else if (this.currentPage <= 3) {
      pages = [1, 2, 3, 4, 5, '...', this.totalPages];
    } else if (this.currentPage >= this.totalPages - 2) {
      pages = [1, '...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages];
    } else {
      pages = [1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages];
    }
    
    return html`
      <span class="page ${this.currentPage === 1 ? 'disabled' : ''}" @click="${() => this.handlePageClick(this.currentPage - 1)}">&#10094;</span>
      ${pages.map(page => 
        page === '...'
          ? html`<span class="dots">...</span>`
          : html`<span class="page ${this.currentPage === page ? 'active' : ''}" @click="${() => this.handlePageClick(page)}">${page}</span>`
      )}
      <span class="page ${this.currentPage === this.totalPages ? 'disabled' : ''}" @click="${() => this.handlePageClick(this.currentPage + 1)}">&#10095;</span>
    `;
  }
}

customElements.define('pagination-component', PaginationComponent);
