import {LitElement, html, customElement, property, css} from 'lit-element';

import './lib/lit-tooltip';
import './lib/lit-tooltip-root';

@customElement('my-app')
export class AppElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        background: #fafafa;
        padding: 96px 24px 24px;
        height: 100vh;
      }

      .app-header {
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background: #3f51b5;
        color: #fff;
        padding: 0 24px;
        height: 64px;
      }

      .app-header h1 {
        font-size: 24px;
        line-height: 24px;
        margin: 0;
      }

      .card {
        display: block;
        padding: 24px;
        margin-bottom: 12px;
        background: #fff;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
      }
    `;
  }

  render() {
    return html`
      <header class="app-header">
        <h1>lit-tooltip demo</h1>
      </header>

      <section>
        <div class="card">
          <button id="button_01">Some button 01</button>
          <lit-tooltip for="button_01" content="Tooltip text 1"></lit-tooltip>
        </div>
        <div class="card">
          <button>Some button 02</button>
          <lit-tooltip content="Tooltip text 2"></lit-tooltip>
        </div>
      </section>
      <lit-tooltip-root></lit-tooltip-root>
    `;
  }
}
