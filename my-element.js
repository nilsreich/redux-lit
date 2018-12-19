var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from './store.js';
//Redux Action
export const INCREMENT1 = 'INCREMENT1';
;
export const increment1 = () => {
    return {
        type: INCREMENT1
    };
};
;
const INITIAL_STATE = {
    clicks_btn1: 0
};
const Clicks = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREMENT1:
            return {
                clicks_btn1: state.clicks_btn1 + 1,
            };
        default:
            return state;
    }
};
export default Clicks;
store.addReducers({
    Clicks
});
//Lit-Element
class MyElement extends connect(store)(LitElement) {
    constructor() {
        super();
        // Public property API that triggers re-render (synced with attributes)
        this.foo = 'foo';
        this.whales = 5;
    }
    // Render method should return a `TemplateResult` using the provided lit-html `html` tag function
    render() {
        return html `
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
      <button @click="${() => this.clickHandler2()}">Vlick</button>

      <slot></slot>
    `;
    }
    clickHandler2() {
        store.dispatch(increment1());
    }
    // This is called every time something is updated in the store.
    stateChanged(state) {
        this.whales = state.Clicks.clicks_btn1;
    }
}
__decorate([
    property()
], MyElement.prototype, "foo", void 0);
__decorate([
    property({ type: Number })
], MyElement.prototype, "whales", void 0);
customElements.define('my-element', MyElement);
