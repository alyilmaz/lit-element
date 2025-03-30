import { html, fixture, expect } from "@open-wc/testing";
import sinon from 'sinon';
import "../src/components/Navbar/navbar.js"; 
  
  describe('navbar component test suite', () => {
    it('check the title of the navbar component', async () => {
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const title = el.shadowRoot.querySelector('.logo');
        
        // Assert the title content
        expect(title.textContent).to.include('ING');
        });

    it('check the logo of the navbar component', async () => {
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Query the image inside the shadow DOM or component
        const logoImage = el.shadowRoot.querySelector('.logo img');

        // Check if the 'src' attribute is correctly set
        expect(logoImage).to.not.be.null;
        expect(logoImage.src).to.include('logo.png');
    });

    it('check the text of the employees button from navbar component', async () => {
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const textButton = el.shadowRoot.querySelector('.employees');

        const  employees = el.languageController.t('employees')
   
        // Assert the title content
        expect(textButton.textContent).to.include(employees);
        });

    it('check the text of the add button from navbar component', async () => {  
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const textButton = el.shadowRoot.querySelector('.add-btn');

        const  addNew = el.languageController.t('addNew')
   
        // Assert the title content
        expect(textButton.textContent).to.include(addNew);
        });

    it('check the text of the language button from navbar component', async () => {
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Query the title element by its class
        const textButton = el.shadowRoot.querySelector('.lang-btn');

        const  langBtn = el.currentLang === 'en' ? '🇹🇷' : '🇬🇧'
   
        // Assert the title content
        expect(textButton.textContent).to.include(langBtn);
        });

    it('check the click event of the add button from navbar component', async () => {       
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Spy on the openAddModal method
        const spy = sinon.spy(el, 'openAddModal');
    
        // Simulate a click on the add button
        const addButton = el.shadowRoot.querySelector('.add-btn');
        addButton.click();
    
        // Check if the method was called
        expect(spy.calledOnce).to.be.true;
      });

    it('check the click event of the lang button from navbar component', async () => {       
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Spy on the switchLanguage method
        const spy = sinon.spy(el, 'switchLanguage');
    
        // Simulate a click on the add button
        const langButton = el.shadowRoot.querySelector('.lang-btn');
        langButton.click();
    
        // Check if the method was called
        expect(spy.calledOnce).to.be.true;
      });


      it('check the lang is changed when lang button is clicked', async () => {       
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Spy on the switchLanguage method
        const spy = sinon.spy(el, 'switchLanguage');
    
        // Simulate a click on the add button
        const langButton = el.shadowRoot.querySelector('.lang-btn');
        const currentLang = el.currentLang;
        langButton.click();
    
        // Check if the method was called
        expect(spy.calledOnce).to.be.true;
        expect(el.currentLang).to.not.equal(currentLang);
      });

      it('check the form-componet rendering when add button is clicked', async () => { 
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Simulate a click on the add button
        const addButton = el.shadowRoot.querySelector('.add-btn');
        addButton.click();

        // Wait for the component to update
        await el.updateComplete;
    
        // Check if the form-component is rendered
        const formComponent = el.shadowRoot.querySelector('form-component');
        expect(formComponent).to.exist;
      });

      it('check the form-componet is not rendering when lang button is clicked', async () => { 
        const el = await fixture(html`<navbar-component></navbar-component>`);
        await el.updateComplete;
    
        // Simulate a click on the add button
        const addButton = el.shadowRoot.querySelector('.lang-btn');
        addButton.click();

        // Wait for the component to update
        await el.updateComplete;
    
        // Check if the form-component is not rendered
        const formComponent = el.shadowRoot.querySelector('form-component');
        expect(formComponent).to.not.exist;
      });
  });