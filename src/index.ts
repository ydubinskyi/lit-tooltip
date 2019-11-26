import './app';

const globalStyles = `
  * {
    box-sizing: border-box;
  }
  html {
    font-family: Roboto, Arial;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  main {
    display: block;
  }
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
`;

const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(globalStyles));

const customElement = document.createElement('my-app');

document.head.appendChild(styleElement);
document.body.appendChild(customElement);
