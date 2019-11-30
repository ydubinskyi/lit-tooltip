import {LitElement, html, css, customElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';

@customElement('lit-tooltip-container')
class LitTooltipContainerElement extends LitElement {
  @property({type: Boolean})
  _showing: boolean;

  @property()
  _tooltipContent: string = '';

  @property()
  position = 'bottom';

  @property({type: Number})
  offset = 12;

  @property()
  _position = {
    top: '',
    left: '',
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
        z-index: 1002;

        max-width: 400px;
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
        ${this._tooltipContent}
      </div>
    `;
  }

  constructor() {
    super();

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  /** @override */
  connectedCallback() {
    super.connectedCallback();

    this._addEventListeners();
  }

  /** @override */
  disconnectedCallback() {
    super.disconnectedCallback();

    this._removeEventListeners();
  }

  async showTooltip({detail}: CustomEvent) {
    this._showing = true;

    this._tooltipContent = detail.content;
    this.position = detail.position;
    this.offset = detail.offset;

    await new Promise((resolve) => requestAnimationFrame(() => resolve()));

    this.updatePosition(detail.target);
  }

  hideTooltip() {
    this._showing = false;
  }

  updatePosition(target) {
    const offset = this.offset;
    const parentRect = this.offsetParent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const thisRect = this.shadowRoot.getElementById('tooltip').getBoundingClientRect();
    const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    const targetLeft = targetRect.left - parentRect.left;
    const targetTop = targetRect.top - parentRect.top;

    let tooltipCoords: any = {};
    switch (this.position) {
      case 'top':
        tooltipCoords.left = targetLeft + horizontalCenterOffset;
        tooltipCoords.top = targetTop - thisRect.height - offset;
        break;
      case 'bottom':
        tooltipCoords.left = targetLeft + horizontalCenterOffset;
        tooltipCoords.top = targetTop + targetRect.height + offset;
        break;
      case 'left':
        tooltipCoords.left = targetLeft - thisRect.width - offset;
        tooltipCoords.top = targetTop + verticalCenterOffset;
        break;
      case 'right':
        tooltipCoords.left = targetLeft + targetRect.width + offset;
        tooltipCoords.top = targetTop + verticalCenterOffset;
        break;
    }

    // Clip the left/right side
    if (parentRect.left + tooltipCoords.left + thisRect.width > window.innerWidth) {
      tooltipCoords.right = '0px';
      tooltipCoords.left = 'auto';
    } else {
      tooltipCoords.left = Math.max(0, tooltipCoords.left) + 'px';
      tooltipCoords.right = 'auto';
    }
    // Clip the top/bottom side.
    if (parentRect.top + tooltipCoords.top + thisRect.height > window.innerHeight) {
      tooltipCoords.bottom = parentRect.height - targetTop + offset + 'px';
      tooltipCoords.top = 'auto';
    } else {
      tooltipCoords.top = Math.max(-parentRect.top, tooltipCoords.top) + 'px';
      tooltipCoords.bottom = 'auto';
    }

    this._position = {
      ...tooltipCoords,
    };
  }

  _addEventListeners() {
    document.body.addEventListener('show-tooltip', this.showTooltip);
    document.body.addEventListener('hide-tooltip', this.hideTooltip);
  }

  _removeEventListeners() {
    document.body.removeEventListener('show-tooltip', this.showTooltip);
    document.body.removeEventListener('hide-tooltip', this.hideTooltip);
  }
}
