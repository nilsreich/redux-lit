import {LitElement, html, property} from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store, RootState, RootAction } from './store.js';



//Redux Action
export const INCREMENT1 = 'INCREMENT1';
import { Action, ActionCreator } from 'redux';
export type CounterAction = CounterActionIncrement;
interface CounterActionIncrement extends Action<'INCREMENT1'> {};
export const increment1: ActionCreator<CounterActionIncrement> = () => {
  return {
    type: INCREMENT1
  };
};



//Redux Reducer
import { Reducer } from 'redux';
export interface CounterState {
  clicks_btn1: number
};
const INITIAL_STATE: CounterState = {
  clicks_btn1: 0
};
const Clicks: Reducer<CounterState, RootAction> = (state = INITIAL_STATE, action) => {
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

  // Public property API that triggers re-render (synced with attributes)
  @property()
  foo = 'foo';

  @property({type: Number})
  whales = 5;

  constructor() {
    super();
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
      <button @click="${() => this.clickHandler2()}">Vlick</button>

      <slot></slot>
    `;
  }


  clickHandler2() {
    store.dispatch(increment1());
  }

  // This is called every time something is updated in the store.
  stateChanged(state: RootState) {
    this.whales = state.Clicks!.clicks_btn1;
  }

}
customElements.define('my-element', MyElement);