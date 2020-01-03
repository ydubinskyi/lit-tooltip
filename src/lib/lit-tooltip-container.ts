import {LitElement, html, css, customElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';

@customElement('lit-tooltip-container')
class LitTooltipContainerElement extends LitElement {
  @property({type: String})
  defaultPosition = 'bottom';

  @property({type: Number})
  defaultOffset = 12;

  @property({attribute: false})
  content = '';

  @property({attribute: false})
  tooltipPosition = {
    top: '',
    left: '',
  };

  @property({attribute: false})
  tooltipVisible = false;

  @property({attribute: false})
  entryAnimation = false;

  @property({attribute: false})
  exitAnimation = false;

  _showing = false;

  _animationPlaying = false;

  _tooltipConfig = {
    position: this.defaultPosition,
    offset: this.defaultOffset,
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
        margin-right: 18px;
        border-radius: 2px;
        z-index: 1002;

        max-width: 400px;
      }

      .hidden {
        display: none !important;
      }

      .entry-animation {
        opacity: 0;
        animation-delay: 200ms;
        animation-name: keyFrameFadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 200ms;
        animation-fill-mode: forwards;
      }
      .exit-animation {
        opacity: 0.9;
        animation-delay: 0ms;
        animation-name: keyFrameFadeOutOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 200ms;
        animation-fill-mode: forwards;
      }

      @keyframes keyFrameFadeInOpacity {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 0.9;
        }
      }
      @keyframes keyFrameFadeOutOpacity {
        0% {
          opacity: 0.9;
        }
        100% {
          opacity: 0;
        }
      }
    `;
  }

  render() {
    let classes = {
      hidden: !this.tooltipVisible,
      'entry-animation': this.entryAnimation,
      'exit-animation': this.exitAnimation,
    };

    return html`
      <div
        id="tooltip"
        class=${classMap(classes)}
        style=${styleMap(this.tooltipPosition)}
        @animationend="${this._onAnimationEnd}"
      >
        ${this.content}
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
    if (this._showing) return;

    this._showing = true;

    this.tooltipVisible = true;
    this.exitAnimation = false;

    this.tooltipPosition = {
      top: '',
      left: '',
    };

    const {content, position, offset, target} = detail;

    // Get config and content for the tooltip
    this.content = content;
    this._tooltipConfig = {
      position: position || this.defaultPosition,
      offset: offset || this.defaultOffset,
    };

    // Need to wait to calculate the tooltip size to properly update position
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    this.updatePosition(target);

    this._animationPlaying = true;
    this.entryAnimation = true;
  }

  hideTooltip() {
    if (!this._showing) return;

    if (this._animationPlaying) {
      this._showing = false;
      this._cancelAnimation();
      return;
    } else {
      this._onAnimationFinish();
    }

    this._showing = false;
    this._animationPlaying = true;
  }

  _cancelAnimation() {
    this.entryAnimation = false;
    this.exitAnimation = false;

    this.tooltipVisible = false;
  }

  _onAnimationFinish() {
    if (this._showing) {
      this.entryAnimation = false;
      this.exitAnimation = true;
    }
  }

  _onAnimationEnd() {
    this._animationPlaying = false;
    if (!this._showing) {
      this.exitAnimation = false;
      this.tooltipVisible = false;
    }
  }

  updatePosition(target: HTMLElement) {
    const {offset, position} = this._tooltipConfig;

    const targetRect = target.getBoundingClientRect();
    const thisRect = this.shadowRoot.getElementById('tooltip').getBoundingClientRect();
    const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;

    let tooltipTop;
    let tooltipLeft;
    switch (position) {
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
    } else if (tooltipLeft < 0 && position === 'left') {
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
