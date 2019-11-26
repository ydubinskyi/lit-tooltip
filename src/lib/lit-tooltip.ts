import {LitElement, html, css, customElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';

@customElement('lit-tooltip')
class LitTooltipElement extends LitElement {
  @property()
  for: string;

  _target;

  @property({type: Boolean})
  _showing: boolean;

  get target() {
    const parentNode = this.parentNode;

    let target;

    if (this.for) {
      target = parentNode.querySelector('#' + this.for);
    } else {
      target = parentNode;
    }
    return target;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: absolute;
        outline: none;
        z-index: 1002;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
      }
      #tooltip {
        display: block;
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

  constructor() {
    super();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._findTarget();
    setTimeout(() => {
      this._addListeners();
    });
  }

  _addListeners() {
    if (this._target) {
      this._target.addEventListener('mouseenter', this.show);
      this._target.addEventListener('focus', this.show);
      this._target.addEventListener('mouseleave', this.hide);
      this._target.addEventListener('blur', this.hide);
      this._target.addEventListener('tap', this.hide);
    }
  }

  _findTarget() {
    this._target = this.target;
  }

  show() {
    if (this._showing) return;

    this._showing = true;
    this.requestUpdate();
  }

  hide() {
    if (!this._showing) return;

    this._showing = false;
    this.requestUpdate();
  }

  render() {
    let classes = {hidden: !this._showing};
    return html`
      <div id="tooltip" class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
  }
}
