import {LitElement, html, property} from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from './store.js';



//Redux Action
const INCREMENT1 = 'INCREMENT1';
const increment1 = () => {
  return {
    type: INCREMENT1
  };
};



//Redux Reducer
const INITIAL_STATE = {
  clicks_btn1: 0,
};
const clicks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT1:
      return {
        clicks_btn1: state.clicks_btn1 + 1,
      };
    default:
      return state;
  }
};
export default clicks;
store.addReducers({
  clicks
});



//Lit-Element
class MyElement extends connect(store)(LitElement) {

  // Public property API that triggers re-render (synced with attributes)
  @property()
  foo = 'foo';

  @property({type: Number})
  whales = 5;

  constructor() {
    super();
    this.addEventListener('click', async (e) => {
      this.whales++;
      await this.updateComplete;
      this.dispatchEvent(new CustomEvent('whales', {detail: {whales: this.whales}}))
    });
  }

  // Render method should return a `TemplateResult` using the provided lit-html `html` tag function
  render() {
    return html`
      <style>
        :host {
          display: block;
        }
        :host([hidden]) {
          display: none;
        }
      </style>
      <h4>Foo: ${this.foo}</h4>
      <div>whales: ${'🐳'.repeat(this.whales)}</div>
      <button @click="${(event: any) => this.clickHandler2(event)}">Vlick</button>

      <slot></slot>
    `;
  }


  clickHandler2(event: any) {
    store.dispatch(increment1());
    console.log(state)
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this.whales = state.clicks.clicks_btn1;
  }

}
customElements.define('my-element', MyElement);