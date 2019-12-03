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
  tooltipPosition = {
    top: '',
    left: '',
  };

  static get styles() {
    return css`
      #tooltip {
        display: block;
        position: fixed;
        outline: none;
        font-size: 12px;
        line-height: 14px;
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
      <div id="tooltip" class=${classMap(classes)} style=${styleMap(this.tooltipPosition)}>
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
    if (!this._showing) return;

    this._showing = false;
  }

  updatePosition(target) {
    const offset = this.offset;
    const targetRect = target.getBoundingClientRect();
    const thisRect = this.shadowRoot.getElementById('tooltip').getBoundingClientRect();
    const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;

    let tooltipTop;
    let tooltipLeft;
    switch (this.position) {
      case 'top':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case 'bottom':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case 'left':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'right':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
    }

    if (tooltipLeft + thisRect.width > window.innerWidth) {
      tooltipLeft = targetLeft - thisRect.width - offset;
    } else if (tooltipLeft < 0 && this.position === 'left') {
      tooltipLeft = targetLeft + targetRect.width + offset;
    } else {
      tooltipLeft = Math.max(targetLeft, tooltipLeft);
    }

    if (tooltipTop + thisRect.height > window.innerHeight) {
      tooltipTop = targetTop - thisRect.height - offset;
    } else if (tooltipTop < 0) {
      tooltipTop = targetTop + targetRect.height + offset;
    } else {
      tooltipTop = tooltipTop;
    }

    this.tooltipPosition = {
      top: tooltipTop + 'px',
      left: tooltipLeft + 'px',
    };
  }

  _addEventListeners() {
    document.body.addEventListener('show-tooltip', this.showTooltip);
    document.body.addEventListener('hide-tooltip', this.hideTooltip);
    window.addEventListener('scroll', this.hideTooltip, {passive: true});

    this.addEventListener('mouseenter', this.hideTooltip, {passive: true});
  }

  _removeEventListeners() {
    document.body.removeEventListener('show-tooltip', this.showTooltip);
    document.body.removeEventListener('hide-tooltip', this.hideTooltip);
    document.body.removeEventListener('scroll', this.hideTooltip);

    this.removeEventListener('mouseenter', this.hideTooltip);
  }
}
