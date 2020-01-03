import {LitElement, html, css, customElement, property, query} from 'lit-element';

@customElement('lit-tooltip')
class LitTooltipElement extends LitElement {
  @property({type: String})
  for: string;

  @property({type: String})
  position: string;

  @property({type: Number})
  offset: number;

  @query('#slot')
  protected slotEl: HTMLSlotElement;

  private _slottedContent: Node[];

  private _target: HTMLElement;

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

  static get styles() {
    return css`
      #slot {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <slot id="slot"></slot>
    `;
  }

  constructor() {
    super();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  /** @override */
  connectedCallback() {
    super.connectedCallback();

    this._addListeners();
  }

  /** @override */
  disconnectedCallback() {
    super.disconnectedCallback();

    this._removeEventListeners();
  }

  /** @override */
  firstUpdated() {
    this._slottedContent = this.slotEl.assignedNodes({flatten: false});
  }

  show() {
    if (this._slottedContent) {
      let event = new CustomEvent('show-tooltip', {
        detail: {
          target: this._target,
          content: this._slottedContent,
          offset: this.offset,
          position: this.position,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  hide() {
    let event = new CustomEvent('hide-tooltip', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _addListeners() {
    this._target = this.target;

    if (this._target) {
      this._target.addEventListener('mouseenter', this.show, {passive: true});
      this._target.addEventListener('focus', this.show, {passive: true});
      this._target.addEventListener('mouseleave', this.hide), {passive: true};
      this._target.addEventListener('blur', this.hide, {passive: true});
      this._target.addEventListener('tap', this.hide), {passive: true};
    }
  }

  _removeEventListeners() {
    if (this._target) {
      this._target.removeEventListener('mouseenter', this.show);
      this._target.removeEventListener('focus', this.show);
      this._target.removeEventListener('mouseleave', this.hide);
      this._target.removeEventListener('blur', this.hide);
      this._target.removeEventListener('tap', this.hide);
    }
  }
}
