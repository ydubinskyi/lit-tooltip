import {LitElement, html, css, customElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';

@customElement('lit-tooltip-root')
class LitTooltipRootElement extends LitElement {
  @property({type: Boolean})
  _showing: boolean;

  @property()
  _content: string = '';

  @property()
  _position = {
    top: '',
    bottom: '',
    left: '',
    right: '',
  };

  static get styles() {
    return css`
      #tooltip {
        display: block;
        position: fixed;
        outline: none;
        font-size: 11px;
        line-height: 1;
        background-color: #616161;
        color: white;
        padding: 8px;
        border-radius: 2px;
      }
      .hidden {
        display: none !important;
      }
    `;
  }

  render() {
    let classes = {hidden: !this._showing};
    return html`
      <div id="tooltip" class=${classMap(classes)} style=${styleMap(this._position)}>
        ${this._content}
      </div>
    `;
  }

  constructor() {
    super();

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    const body = document.querySelector('body');

    body.addEventListener('show-tooltip', (e) => this.showTooltip(e));
    body.addEventListener('hide-tooltip', (e) => this.hideTooltip(e));
  }

  showTooltip(e) {
    this._showing = true;
    this._content = e.detail.content;
  }

  hideTooltip(e) {
    this._showing = false;
  }
}
