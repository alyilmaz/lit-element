import { html, fixture, expect } from "@open-wc/testing";
import sinon from 'sinon';
import "../src/components/Confirmation/delete-confirmation.js";

describe('delete-confirmation component test suite', () => {
    const item = {id: 123,
        firstName: 'Ali',
        lastName: 'YILMAZ',
        employmentDate: '23/09/2022',
        birthDate: '24/03/1990',
        phone: '+90 532 123 45 67',
        email: 'ali@yilmaz.org',
        department: 'Analytics',
        position: 'Junior'}

    it('check the question of the delete-confirmation component', async () => {
        const el = await fixture(html`<delete-confirmation .employee="${item}"></delete-confirmation>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const question = el.shadowRoot.querySelector('span');
        
        // Assert the question content
        expect(question.textContent).to.equal(el.languageController.t('areYouSure'));
    });
    it('check the text of the deleteConfirmation from the delete-confirmation component', async () => {
        const el = await fixture(html`<delete-confirmation .employee="${item}"></delete-confirmation>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const confirmMessage = el.shadowRoot.querySelector('.modal-body');
        
        // Assert the confirmation message content
        expect(confirmMessage.textContent.trim()).to.equal(el.languageController.t('deleteConfirmation').replace("firstName", item.firstName)
        .replace("lastName", item.lastName));
    });

    it('check the text of the cancel button from the delete-confirmation component', async () => {
        const el = await fixture(html`<delete-confirmation .employee="${item}"></delete-confirmation>`);
        await el.updateComplete;
    
        // Spy on the _cancel method
        const spy = sinon.spy(el, 'dispatchEvent');;
    
        // Simulate a click on the cancel button
        const cancelButton = el.shadowRoot.querySelector('.cancel-btn');
        cancelButton.click();
    
        // Check if the method was called
        expect(spy.calledWith(sinon.match.has('type', 'cancel'))).to.true;
    });

    it('check the confirm button from the delete-confirmation component', async () => {
        const el = await fixture(html`<delete-confirmation .employee="${item}"></delete-confirmation>`);
        await el.updateComplete;
    
       // Spy on the _cancel method
        const spy = sinon.spy(el, 'dispatchEvent');;
    
        // Simulate a click on the confirm button
        const cancelButton = el.shadowRoot.querySelector('.proceed-btn');
        cancelButton.click();
    
        // Check if the method was called
        expect(spy.calledWith(sinon.match.has('type', 'confirm'))).to.true;
    });

});