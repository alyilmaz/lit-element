

  import { html, fixture, expect } from "@open-wc/testing";
  import sinon from 'sinon';
  import "../src/components/menubar/menu-bar.js"; 
  
  describe('menu-bar component test suite', () => {
  it('check the title of the menu-bar component', async () => {
    const el = await fixture(html`<menu-bar title="MyTitle"></menu-bar>`);
    await el.updateComplete;

    // Query the title element by its class
    const title = el.shadowRoot.querySelector('.title');
      
    // Assert the title content
    expect(title.textContent).to.equal('MyTitle');
  });

  it('should trigger the "enable-list" event when list icon is clicked', async () => {
    // render the menu-bar component
    const el = await fixture(html`<menu-bar title="MyMenu"></menu-bar>`);
    
    // Wait for finish rendering
    await el.updateComplete;

    // Spy on the dispatchEvent method
    const spy = sinon.spy(el, 'dispatchEvent');

    // Trigger the click event on the list icon
    const listIcon = el.shadowRoot.querySelector('#enableList');
    listIcon.click();

    // Check if the "enable-list" event was dispatched
    expect(spy.calledWith(sinon.match.has('type', 'enable-list'))).to.true;
  });

  it('should trigger the "enable-table" event when table icon is clicked', async () => {
    // render the menu-bar component
    const el = await fixture(html`<menu-bar title="MyMenu"></menu-bar>`);
    
    // Wait for finish rendering
    await el.updateComplete;

    // Spy on the dispatchEvent method
    const spy = sinon.spy(el, 'dispatchEvent');

    // Trigger the click event on the list icon
    const listIcon = el.shadowRoot.querySelector('#enableTable');
    listIcon.click();

    // Check if the "enable-table" event was dispatched
    expect(spy.calledWith(sinon.match.has('type', 'enable-table'))).to.true;
  });

});