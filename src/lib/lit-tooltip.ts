import {LitElement, html, css, customElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';

@customElement('lit-tooltip')
class LitTooltipElement extends LitElement {
  _target;

  @property({type: String})
  content = '';

  @property({type: String})
  position = 'bottom';

  @property({type: Boolean})
  fitToVisibleBounds = false;

  @property({type: Number})
  offset = 12;

  render() {
    return html`
      <slot
        @mouseenter="${(e) => this.show(e)}"
        @focus="${(e) => this.show(e)}"
        @mouseleave="${(e) => this.hide(e)}"
        @blur="${(e) => this.hide(e)}"
        @tap="${(e) => this.hide(e)}"
      >
      </slot>
    `;
  }

  constructor() {
    super();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show(e) {
    let event = new CustomEvent('show-tooltip', {
      detail: {
        target: e.target,
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
        target: e.target,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
