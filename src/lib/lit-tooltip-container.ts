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
  _animating = false;

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
      hidden: !this.tooltipVisible && !this._animating,
      'entry-animation': this.tooltipVisible && this._animating,
      'exit-animation': !this.tooltipVisible && this._animating,
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
    if (this.tooltipVisible) return;

    this._animating = true;
    this.tooltipVisible = true;

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

    const tooltip = this.shadowRoot.getElementById('tooltip');

    // Need to wait to calculate the tooltip size to properly update position
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    this.updatePosition(target, tooltip);
  }

  hideTooltip() {
    if (!this.tooltipVisible) return;

    if (this._animating) {
      // cancel ongoing fade in animation
      this._animating = false;
      this.tooltipVisible = false;
      return;
    }

    this._animating = true;

    this.tooltipVisible = false;
  }

  _onAnimationEnd() {
    this._animating = false;
  }

  updatePosition(target: HTMLElement, tooltip: HTMLElement) {
    const {offset, position} = this._tooltipConfig;

    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetHeight = targetRect.height;
    const targetWidth = targetRect.width;

    const tooltipHeight = tooltipRect.height;
    const tooltipWidth = tooltipRect.width;

    const horizontalCenterOffset = (targetWidth - tooltipWidth) / 2;
    const verticalCenterOffset = (targetHeight - tooltipHeight) / 2;

    const isPositionVertical = (position) =>
      ['top', 'bottom'].includes(position);

    let tooltipPosTop;
    let tooltipPosLeft;

    // get basic position of the tooltip
    switch (position) {
      case 'top':
        tooltipPosLeft = targetLeft + horizontalCenterOffset;
        tooltipPosTop = targetTop - tooltipHeight - offset;
        break;
      case 'bottom':
        tooltipPosLeft = targetLeft + horizontalCenterOffset;
        tooltipPosTop = targetTop + targetHeight + offset;
        break;
      case 'left':
        tooltipPosLeft = targetLeft - tooltipWidth - offset;
        tooltipPosTop = targetTop + verticalCenterOffset;
        break;
      case 'right':
        tooltipPosLeft = targetLeft + targetWidth + offset;
        tooltipPosTop = targetTop + verticalCenterOffset;
        break;
    }

    // tooltip crosses right window border
    if (tooltipPosLeft + tooltipWidth > window.innerWidth) {
      if (isPositionVertical(position)) {
        tooltipPosLeft = targetLeft + targetWidth - tooltipWidth;
      } else {
        tooltipPosLeft = targetLeft - tooltipWidth - offset;
      }
    }

    // tooltip cross left window border
    if (tooltipPosLeft < 0) {
      if (isPositionVertical(position)) {
        tooltipPosLeft = targetLeft;
      } else {
        tooltipPosLeft = targetLeft + targetWidth + offset;
      }
    }

    // tooltip cross bottom window border
    if (tooltipPosTop + tooltipHeight > window.innerHeight) {
      if (isPositionVertical(position)) {
        tooltipPosTop = targetTop - tooltipHeight - offset;
      } else {
        tooltipPosTop = targetTop + targetHeight - tooltipHeight;
      }
    }

    // tooltip cross top window border
    if (tooltipPosTop < 0) {
      if (isPositionVertical(position)) {
        tooltipPosTop = targetTop + targetHeight + offset;
      } else {
        tooltipPosTop = targetTop;
      }
    }

    this.tooltipPosition = {
      top: tooltipPosTop + 'px',
      left: tooltipPosLeft + 'px',
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
    window.removeEventListener('scroll', this.hideTooltip);

    this.removeEventListener('mouseenter', this.hideTooltip);
  }
}
