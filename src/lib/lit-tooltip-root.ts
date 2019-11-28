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
  position = 'bottom';

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

    body.addEventListener('show-tooltip', this.showTooltip);
    body.addEventListener('hide-tooltip', this.hideTooltip);
  }

  async showTooltip({detail}: CustomEvent) {
    this._showing = true;
    this._content = detail.content;

    await new Promise((resolve) => requestAnimationFrame(() => resolve()));

    this.updatePosition(detail.target);
  }

  hideTooltip(e) {
    this._showing = false;
  }

  updatePosition(target) {
    const offset = 12;

    var parentRect = this.offsetParent.getBoundingClientRect();
    var targetRect = target.getBoundingClientRect();
    var thisRect = this.shadowRoot.getElementById('tooltip').getBoundingClientRect();
    var horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    var verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    var targetLeft = targetRect.left - parentRect.left;
    var targetTop = targetRect.top - parentRect.top;
    var tooltipLeft, tooltipTop;
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

    this._position = {
      top: tooltipTop + 'px',
      left: tooltipLeft + 'px',
    };
  }
}
