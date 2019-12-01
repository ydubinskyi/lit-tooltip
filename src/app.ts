import {LitElement, html, customElement, css} from 'lit-element';

import './lib/lit-tooltip';
import './lib/lit-tooltip-container';

@customElement('my-app')
export class AppElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        background: #fafafa;
        padding: 96px 24px 24px;
        height: 100vh;
      }

      button {
        display: inline-block;
        background: #3f51b5;
        border: 0;
        border-radius: 2px;
        color: #fff;
        font-size: 14px;
        line-height: 1;
        padding: 8px 16px;
        overflow: hidden;
        height: auto;
      }

      .app-header {
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background: #3f51b5;
        color: #fff;
        padding: 0 24px;
        height: 64px;
      }

      .app-header h1 {
        font-size: 24px;
        line-height: 24px;
        margin: 0;
      }

      .card {
        display: block;
        padding: 24px;
        margin-bottom: 12px;
        background: #fff;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
      }

      .align-right {
        text-align: right;
      }
    `;
  }

  render() {
    return html`
      <header class="app-header">
        <h1 id="fixed_title">lit-tooltip demo</h1>
        <lit-tooltip for="fixed_title">
          Fixed title tooltip
        </lit-tooltip>
      </header>

      <section>
        <div class="card align-right">
          <button id="button_01">Some button 01</button>
          <p>Position: right</p>
          <lit-tooltip for="button_01" position="right">
            Tooltip text position right text
          </lit-tooltip>
        </div>
        <div class="card">
          <button id="button_02">Some button 02</button>
          <p>Position: left</p>
          <lit-tooltip for="button_02" position="left">
            Tooltip text 2
            <span>${Math.random()}</span>
          </lit-tooltip>
        </div>
        <div class="card">
          <button id="button_03">Some button 03</button>
          <p>Position: top</p>
          <lit-tooltip for="button_03">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quidem ipsum qui, est sit magni in soluta
            iusto perspiciatis voluptatum fugiat necessitatibus earum! Corporis soluta maiores illum cum consequatur
            dolorem, molestias aliquid aspernatur dolor perferendis ipsum saepe dolore, corrupti laborum recusandae
            asperiores sit quisquam. Consequatur hic, iure placeat officia aliquid nihil, nulla repellat adipisci quas
          </lit-tooltip>
        </div>
        <div class="card">
          <button id="button_04">Some button 04</button>
          <lit-tooltip for="button_04">
            Tooltip text 2
          </lit-tooltip>
        </div>
        <div class="card">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quidem ipsum qui, est sit magni in soluta
            iusto perspiciatis voluptatum fugiat necessitatibus earum! Corporis soluta maiores illum cum consequatur
            dolorem, molestias aliquid aspernatur dolor perferendis ipsum saepe dolore, corrupti laborum recusandae
            asperiores sit quisquam. Consequatur hic, iure placeat officia aliquid nihil, nulla repellat adipisci quas
            dignissimos esse ad. Suscipit omnis sequi magnam sapiente dolor possimus aliquam nostrum saepe, adipisci ab
            ipsa eligendi odit, natus est. Necessitatibus, velit ducimus rem, quae quod, impedit iste sunt corporis
            perspiciatis placeat repudiandae quos blanditiis facere eligendi! Rem mollitia deserunt voluptas, neque
            cumque accusamus maxime vitae minima excepturi et unde nisi architecto officiis asperiores omnis illum
            officia error sequi, veritatis iste reprehenderit. Iste ab ullam maxime natus reiciendis voluptatum alias
            odit. Eaque eum ad at consequatur rerum hic illum voluptas voluptatum! Beatae corrupti dolorum repellendus
            eum fuga quae ipsa at rem ducimus obcaecati, pariatur esse temporibus cumque incidunt maxime itaque, illo
            consectetur dolores voluptate quo aliquam ab! Ipsam, nesciunt maiores. Voluptatum fugiat nesciunt harum
            architecto voluptate, modi nam quos quidem atque similique consequuntur distinctio, qui doloremque nihil.
            Soluta assumenda doloribus molestiae iure voluptatem ipsa. Voluptates, magnam aspernatur? Illo, doloribus
            necessitatibus, quod hic omnis debitis consectetur pariatur, sed mollitia itaque aliquam veritatis unde
            vitae error enim? Sint adipisci debitis, voluptate harum blanditiis recusandae molestiae totam ratione, ut,
            nulla facilis asperiores vero animi assumenda in alias? Obcaecati cupiditate unde itaque mollitia ducimus
            iste quisquam voluptatum autem nesciunt distinctio, provident accusantium ex iure enim nulla cum tempore?
            Labore aut distinctio cum veniam ducimus soluta sit fugiat laborum, rerum officia doloribus explicabo,
            maxime, maiores praesentium quae natus magni qui ex consectetur non similique. Quaerat enim provident eaque
            aperiam dolorum velit nisi, distinctio rem adipisci neque amet recusandae quis non aut pariatur debitis
            necessitatibus natus eius voluptates corrupti omnis earum. Modi error excepturi perferendis ut recusandae
            iusto nulla minima. Nemo, dolor labore expedita voluptas id earum impedit perspiciatis nihil corrupti
            blanditiis nulla beatae consequuntur error atque explicabo ab! Iste beatae eos, ducimus placeat, culpa
            mollitia minus nesciunt nostrum, alias ipsa labore quasi eum tenetur consequuntur ea laboriosam sunt nemo. A
            dolor sed dolores. Ipsa ipsum, voluptates velit sunt nisi debitis. Reprehenderit doloribus exercitationem,
            nulla maiores voluptatum laudantium eaque pariatur veniam temporibus! Perferendis iusto maiores adipisci
            aperiam, magni ab, sed inventore accusantium aliquam magnam incidunt labore eius, molestiae itaque
            consectetur? Aliquid at architecto ullam non maxime illum dicta ea, in magni vero similique voluptatibus
            beatae magnam reiciendis blanditiis tempore iste delectus molestias. Ut ad veniam suscipit, culpa fugiat
            aperiam? Corrupti nisi, est placeat facilis quia rerum hic magni provident. Laboriosam aspernatur
            reprehenderit, ullam eligendi ea voluptatum quia non maiores ab necessitatibus, consequuntur autem, illo
            quaerat delectus? Amet consectetur ipsum ipsam et exercitationem autem debitis eius itaque, vero iusto sequi
            quod. Dolores impedit nam ex non laudantium perspiciatis dolorem qui cum similique culpa dolorum, harum
            laboriosam quas. Quisquam quos fugit, culpa a eum incidunt blanditiis veritatis id. Dicta exercitationem
            aspernatur amet eveniet doloremque a, facilis ducimus consectetur necessitatibus! Eaque consequatur error
            dolorem.
          </p>
        </div>
        <div class="card">
          <button id="button_05">Some button 04</button>
          <lit-tooltip for="button_05">
            Tooltip text 5
          </lit-tooltip>
        </div>
        <div class="card">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quidem ipsum qui, est sit magni in soluta
            iusto perspiciatis voluptatum fugiat necessitatibus earum! Corporis soluta maiores illum cum consequatur
            dolorem, molestias aliquid aspernatur dolor perferendis ipsum saepe dolore, corrupti laborum recusandae
            asperiores sit quisquam. Consequatur hic, iure placeat officia aliquid nihil, nulla repellat adipisci quas
            dignissimos esse ad. Suscipit omnis sequi magnam sapiente dolor possimus aliquam nostrum saepe, adipisci ab
            ipsa eligendi odit, natus est. Necessitatibus, velit ducimus rem, quae quod, impedit iste sunt corporis
            perspiciatis placeat repudiandae quos blanditiis facere eligendi! Rem mollitia deserunt voluptas, neque
            cumque accusamus maxime vitae minima excepturi et unde nisi architecto officiis asperiores omnis illum
            officia error sequi, veritatis iste reprehenderit. Iste ab ullam maxime natus reiciendis voluptatum alias
            odit. Eaque eum ad at consequatur rerum hic illum voluptas voluptatum! Beatae corrupti dolorum repellendus
            eum fuga quae ipsa at rem ducimus obcaecati, pariatur esse temporibus cumque incidunt maxime itaque, illo
            consectetur dolores voluptate quo aliquam ab! Ipsam, nesciunt maiores. Voluptatum fugiat nesciunt harum
            architecto voluptate, modi nam quos quidem atque similique consequuntur distinctio, qui doloremque nihil.
            Soluta assumenda doloribus molestiae iure voluptatem ipsa. Voluptates, magnam aspernatur? Illo, doloribus
            necessitatibus, quod hic omnis debitis consectetur pariatur, sed mollitia itaque aliquam veritatis unde
            vitae error enim? Sint adipisci debitis, voluptate harum blanditiis recusandae molestiae totam ratione, ut,
            nulla facilis asperiores vero animi assumenda in alias? Obcaecati cupiditate unde itaque mollitia ducimus
            iste quisquam voluptatum autem nesciunt distinctio, provident accusantium ex iure enim nulla cum tempore?
            Labore aut distinctio cum veniam ducimus soluta sit fugiat laborum, rerum officia doloribus explicabo,
            maxime, maiores praesentium quae natus magni qui ex consectetur non similique. Quaerat enim provident eaque
            aperiam dolorum velit nisi, distinctio rem adipisci neque amet recusandae quis non aut pariatur debitis
            necessitatibus natus eius voluptates corrupti omnis earum. Modi error excepturi perferendis ut recusandae
            iusto nulla minima. Nemo, dolor labore expedita voluptas id earum impedit perspiciatis nihil corrupti
            blanditiis nulla beatae consequuntur error atque explicabo ab! Iste beatae eos, ducimus placeat, culpa
            mollitia minus nesciunt nostrum, alias ipsa labore quasi eum tenetur consequuntur ea laboriosam sunt nemo. A
            dolor sed dolores. Ipsa ipsum, voluptates velit sunt nisi debitis. Reprehenderit doloribus exercitationem,
            nulla maiores voluptatum laudantium eaque pariatur veniam temporibus! Perferendis iusto maiores adipisci
            aperiam, magni ab, sed inventore accusantium aliquam magnam incidunt labore eius, molestiae itaque
            consectetur? Aliquid at architecto ullam non maxime illum dicta ea, in magni vero similique voluptatibus
            beatae magnam reiciendis blanditiis tempore iste delectus molestias. Ut ad veniam suscipit, culpa fugiat
            aperiam? Corrupti nisi, est placeat facilis quia rerum hic magni provident. Laboriosam aspernatur
            reprehenderit, ullam eligendi ea voluptatum quia non maiores ab necessitatibus, consequuntur autem, illo
            quaerat delectus? Amet consectetur ipsum ipsam et exercitationem autem debitis eius itaque, vero iusto sequi
            quod. Dolores impedit nam ex non laudantium perspiciatis dolorem qui cum similique culpa dolorum, harum
            laboriosam quas. Quisquam quos fugit, culpa a eum incidunt blanditiis veritatis id. Dicta exercitationem
            aspernatur amet eveniet doloremque a, facilis ducimus consectetur necessitatibus! Eaque consequatur error
            dolorem.
          </p>
        </div>
      </section>
      <lit-tooltip-container></lit-tooltip-container>
    `;
  }
}
