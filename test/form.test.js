import { html, fixture, expect } from "@open-wc/testing";
import sinon from 'sinon';
import "../src/components/Form/form.js";

describe('form component test suite', () => {
    const item = {id: 123,
        firstName: 'Ali',
        lastName: 'YILMAZ',
        employmentDate: '23/09/2022',
        birthDate: '24/03/1990',
        phone: '+90 532 123 45 67',
        email: 'ali@yilmaz.org',
        department: 'Analytics',
        position: 'Junior'}

    it('check the title of the form component for adding item', async () => {
        const el = await fixture(html`<form-component title="Add Employee" status="add"></form-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const title = el.shadowRoot.querySelector('p');
        
        // Assert the title content
        expect(title.textContent).to.equal('Add Employee');
    });

    it('check the title of the form component for updating item', async () => {
        const el = await fixture(html`<form-component title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const title = el.shadowRoot.querySelector('p');
        
        // Assert the title content
        expect(title.textContent).to.equal('Update Employee');
    });

    it('check the text of the confirm button from the form component for adding item', async () => {
        const el = await fixture(html`<form-component title="Add Employee" status="add"></form-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const confirmButton = el.shadowRoot.querySelector('.confirm-btn');
        
        // Assert the text button
        expect(confirmButton.textContent).to.equal(el.languageController.t('add'));
    });

    it('check the text of the confirm button from the form component for updating item', async () => {
        const el = await fixture(html`<form-component title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const confirmButton = el.shadowRoot.querySelector('.confirm-btn');
        
        // Assert the text button
        expect(confirmButton.textContent).to.equal(el.languageController.t('update'));
    });
    it('check the text of the cancel button from the form component', async () => {
        const el = await fixture(html`<form-component title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const cancelButton = el.shadowRoot.querySelector('.cancel-btn');
        
        // Assert the text button
        expect(cancelButton.textContent).to.equal(el.languageController.t('cancel'));
    });

    it('check the all field of item data from the form component', async () => {
        const el = await fixture(html`<form-component .item="${item}" title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;

        // Query the all field 
        Object.entries(item).map(
            ([key, value]) =>{ 
            const field = el.shadowRoot.querySelector(`input[placeholder="${key}"]`);
            if (field) {
                expect(field.value).to.equal(value);
            }
            })
    });
    it('check the click event of the confirm button from the form component', async () => {       
        const el = await fixture(html`<form-component .item="${item}" title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Spy on the _confirm method
        const spy = sinon.spy(el, 'dispatchEvent');
    
        // Simulate a click on the confirm button
        const confirmButton = el.shadowRoot.querySelector('.confirm-btn');
        confirmButton.click();

        await el.updateComplete;
    
        // Check if the method was called
       expect(spy.calledWith(sinon.match.has('type', 'confirm'))).to.true;
      });

    it('check the click event of the cancel button from the form component', async () => {       
        const el = await fixture(html`<form-component .item="${item}" title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Spy on the _cancel method
        const spy = sinon.spy(el, 'dispatchEvent');;
    
        // Simulate a click on the cancel button
        const cancelButton = el.shadowRoot.querySelector('.cancel-btn');
        cancelButton.click();
    
        // Check if the method was called
        expect(spy.calledWith(sinon.match.has('type', 'cancel'))).to.true;
      });

    it('check the click event of the select field from the form component', async () => {       
        const el = await fixture(html`<form-component .item="${item}" title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Spy on the updateField method
        const spy = sinon.spy(el, 'updateField');
    
        // Simulate a click on the select field
        const selectField = el.shadowRoot.querySelector('#dropdown');
        selectField.value = 'Senior';
        selectField.dispatchEvent(new Event('change'));
    
        // Check if the method was called
        expect(spy.calledOnce).to.be.true;
      });
    it('check the click event of the input field from the form component', async () => {       
        const el = await fixture(html`<form-component .item="${item}" title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Spy on the updateField method
        const spy = sinon.spy(el, 'updateField');
    
        // Simulate a click on the input field
        const inputField = el.shadowRoot.querySelector('input[placeholder="firstName"]');
        inputField.value = 'John';
        inputField.dispatchEvent(new Event('input'));
    
        // Check if the method was called
        expect(spy.calledOnce).to.be.true;
      });

      it('check the firstName is updated the form component', async () => {       
        const el = await fixture(html`<form-component .item="${item}" title="Update Employee" status="update"></form-component>`);
        await el.updateComplete;
    
        // Spy on the updateField method
        const spy = sinon.spy(el, 'updateField');
    
        // Simulate a click on the select field
        const firstName = el.shadowRoot.querySelector('input[placeholder="firstName"]');
        firstName.value = 'Veli';
        firstName.dispatchEvent(new Event('input'));
    
        // Check if the method was called
        expect(spy.calledOnce).to.be.true;
        expect(el.item.firstName).to.equal('Veli');
      });
 


    });