import { html, fixture, expect } from "@open-wc/testing";
import sinon from 'sinon';
import "../src/components/DataTable/table.js";

describe('data-table component test suite', () => {

    const headers = ['firstName', 'lastName', 'employmentDate', 'birthDate', 'phone', 'email', 'department', 'position', 'actions'];

    const data = Array(10).fill().map((_, i) => ({
        id: i + 1,
        firstName: 'Ahmet',
        lastName: 'Sourtimes',
        employmentDate: '23/09/2022',
        birthDate: '23/09/2022',
        phone: '+90 532 123 45 67',
        email: 'ahmet@sourtimes.org',
        department: 'Analytics',
        position: 'Junior'
      }));

    it('check all headers of the table', async () => {
    const el = await fixture(html`<table-component .headers="${headers}" .data="${data}"></table-component>`);
    await el.updateComplete;

    // Query the headers element by its class
    const headersOfTable = Array.from(el.shadowRoot.querySelectorAll('table tr th')); 

    headersOfTable.forEach((header, index) => {
        // Check if the header text matches the expected header
        expect(header.textContent).to.equal(el.languageController.t(headers[index]));
    })
      
    });

    it('check number of totalPages from  the table', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;
    
        // get totalPages from the table component
        const totalPages = el.totalPages;
        
        expect(totalPages).to.equal(data.length / el.itemsPerPage); 
    });

    it('check pagination is rendered in the table', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;
    
        // Check pagination-component is rendered
        const paginationComponent = el.shadowRoot.querySelector('pagination-component');
        expect(paginationComponent).to.exist;
    });

    it('check delete-confimation is Not rendered in the table', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;
    
        // Check pagination-component is Not rendered
        const deleteConfirmation = el.shadowRoot.querySelector('delete-confirmation');
        expect(deleteConfirmation).to.not.exist;
    });

    it('check delete-confimation is rendered in the table', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;

        // Simulate a click on the delete button
        const deleteButton = el.shadowRoot.querySelector('.delete');
        deleteButton.click();

        // Wait for the component to update
        await el.updateComplete;
    
        // Check pagination-component is rendered
        const deleteConfirmation = el.shadowRoot.querySelector('delete-confirmation');
        expect(deleteConfirmation).to.exist;
    });

    it('check edit-form is rendered in the table', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;

        // Simulate a click on the edit button
        const editButton = el.shadowRoot.querySelector('.edit');
        editButton.click();

        // Wait for the component to update
        await el.updateComplete;
    
        // Check edit-form is rendered
        const editForm = el.shadowRoot.querySelector('form-component');
        expect(editForm).to.exist;
    });

    it('check edit-form is Not rendered in the table', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;
    
        // Check edit-form is rendered
        const editForm = el.shadowRoot.querySelector('form-component');
        expect(editForm).to.not.exist;
    });

    it('check edit method is invoked when edit button clicked', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;

        // Spy on the openEditModal method
        const spy = sinon.spy(el, 'openEditModal');

        // Simulate a click on the edit button
        const editButton = el.shadowRoot.querySelector('.edit');
        editButton.click();

        // Wait for the component to update
        await el.updateComplete;
    
       // Check if the method was called
       expect(spy.calledOnce).to.be.true;        
    });

    it('check delete method is Not invoked when edit button clicked', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;

        // Spy on the openDeleteModal method
        const spy = sinon.spy(el, 'openDeleteModal');

        // Simulate a click on the edit button
        const editButton = el.shadowRoot.querySelector('.edit');
        editButton.click();

        // Wait for the component to update
        await el.updateComplete;
    
       // Check if the method was Not called
       expect(spy.calledOnce).to.be.false;        
    });

    it('check delete method is invoked when edit button clicked', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=5></table-component>`);
        await el.updateComplete;

        // Spy on the openDeleteModal method
        const spy = sinon.spy(el, 'openDeleteModal');

        // Simulate a click on the delete button
        const editButton = el.shadowRoot.querySelector('.delete');
        editButton.click();

        // Wait for the component to update
        await el.updateComplete;
    
       // Check if the method was called
       expect(spy.calledOnce).to.be.true;        
    });

    it('check number of rows in the last page', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=3 currentPage=4></table-component>`);
        await el.updateComplete;
    
        // Query the rows element by its class
        const rowsOfTable = el.paginatedData.length;
        // number must be 1 in the last page due to only one item remain
        expect(rowsOfTable).to.equal(1)
    });

    it('check number of rows in the first page', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=3 currentPage=1></table-component>`);
        await el.updateComplete;
    
        // Query the rows element by its class
        const rowsOfTable = el.paginatedData.length;
        // number must equal to itemsPerPage in the first page
        expect(rowsOfTable).to.equal(3)
    });

    it('check content of rows in the last page', async () => {
        const el = await fixture(html`<table-component .headers="${headers}" .data="${data}" itemsPerPage=3 currentPage=4></table-component>`);
        await el.updateComplete;
    
        // Query the rows element by its class
        const rowOfTable = Array.from(el.shadowRoot.querySelectorAll('table tr td')); 

        rowOfTable.forEach((row, index) => {
        // Check if the row text matches the expected item content
        // actions colon is removed
        if(index < 8){
            const theLastData = data[data.length -1]
            expect(row.textContent).to.be.equal(theLastData[headers[index]])
        }
        
    })
    });


});