import { html, fixture, expect } from "@open-wc/testing";
import sinon from 'sinon';
import "../src/components/DataTable/pagination.js";

describe('pagination component test suite', () => {

    it('should render the correct number of pages', async () => {
        const el = await fixture(html`<pagination-component currentPage=1 totalPages=2 ></pagination-component>`);
        const pages = el.shadowRoot.querySelectorAll('.page');

        pages.forEach((page) => {
            // remove <, >, and dots ...
        if (page.textContent && !isNaN(page.textContent - parseFloat(page.textContent))) {
                expect(parseInt(page.textContent)).to.be.at.least(1);
                expect(parseInt(page.textContent)).to.be.at.most(2);
        }
            
        });
      });

      it('should render the ... dots of pages', async () => {
        const el = await fixture(html`<pagination-component currentPage=1 totalPages=8 ></pagination-component>`);
        const dots = el.shadowRoot.querySelectorAll('.dots');

        expect(dots).to.exist;
        
      });

      it('should not render the ... dots of pages', async () => {
        const el = await fixture(html`<pagination-component currentPage=1 totalPages=4 ></pagination-component>`);
        const dots = el.shadowRoot.querySelectorAll('.dots');
        // Check if the dots are not rendered
        expect(dots).to.not.exist;
        
      });

      it('check the currentPage number is actived', async () => {
        const currentPage = 3;
        const el = await fixture(html`<pagination-component .currentPage=${currentPage} totalPages=4 ></pagination-component>`);
        const pages = el.shadowRoot.querySelectorAll('.page');

        pages.forEach((page) => {
        // remove <, >, and dots ...
        if (page.textContent && !isNaN(page.textContent - parseFloat(page.textContent)) && (parseInt(page.textContent) === currentPage)) {
            expect(page.classList.contains('active')).to.be.true;
        }
            
        });
      });

      it('check the currentPage number is Not actived', async () => {
        const currentPage = 3;
        const el = await fixture(html`<pagination-component .currentPage=${currentPage} totalPages=5 ></pagination-component>`);
        const pages = el.shadowRoot.querySelectorAll('.page');

        pages.forEach((page) => {
        // remove <, >, and dots ...
        if (page.textContent && !isNaN(page.textContent - parseFloat(page.textContent)) && (parseInt(page.textContent) !== currentPage)) {
            expect(page.classList.contains('active')).to.be.false;
        }
            
        });
      });

      it('check the active page is changed when click the number', async () => {
        const newPage = 3;
        const el = await fixture(html`<pagination-component .currentPage=1 totalPages=5 ></pagination-component>`);
        const pages = el.shadowRoot.querySelectorAll('.page');

        pages.forEach(async (page) => {
        // remove <, >, and dots ...
        if (page.textContent && !isNaN(page.textContent - parseFloat(page.textContent)) && (parseInt(page.textContent) === newPage)) {
            // Check the page is not active
            expect(page.classList.contains('active')).to.be.false;
            // Spy on the dispatchEvent method
            const spy = sinon.spy(el, 'dispatchEvent');
            // Simulate a click on the page
            page.click();
            // Wait for the component to update
            await el.updateComplete;
            // Check the "changePage" event was dispatched
            expect(spy.calledWith(sinon.match.has('type', 'changePage'))).to.true;
            // Check the page is active
            expect(page.classList.contains('active')).to.be.true;
            
        }
            
        });
      });
});