import {LitElement, html, css, customElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';

@customElement('lit-tooltip')
class LitTooltipElement extends LitElement {
  @property({type: String})
  for;

  @property({type: String})
  content = '';

  @property({type: String})
  position = 'bottom';

  @property({type: Boolean})
  fitToVisibleBounds = false;

  @property({type: Number})
  offset = 12;

  _target;

  get target() {
    const parentNode = this.parentNode;

    const ownerRoot: any = this.getRootNode();
    let target;
    if (this.for) {
      target = parentNode.querySelector('#' + this.for);
    } else {
      target = parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE ? ownerRoot.host : parentNode;
    }

    return target;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  constructor() {
    super();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._target = this.target;
    this._addListeners();
  }

  _addListeners() {
    if (this._target) {
      this._target.addEventListener('mouseenter', this.show, {passive: true});
      this._target.addEventListener('focus', this.show, {passive: true});
      this._target.addEventListener('mouseleave', this.hide), {passive: true};
      this._target.addEventListener('blur', this.hide, {passive: true});
      this._target.addEventListener('tap', this.hide), {passive: true};
    }
  }

  show(e) {
    let event = new CustomEvent('show-tooltip', {
      detail: {
        target: this._target,
        content: this.content,
        offset: this.offset,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  hide(e) {
    let event = new CustomEvent('hide-tooltip', {
      detail: {
        target: this._target,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
