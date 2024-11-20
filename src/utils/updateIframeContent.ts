/**
 * @param {HTMLIFrameElement} iframe
 * @param {{ html: string, css: string, js: string }} args
 * @returns {void}
 */

type updateIframeContent = (iframe: HTMLIFrameElement, args: { html: string; css: string; js: string }) => void;

export const updateIframeContent: updateIframeContent = (iframe, { html, css, js }): void => {
    const source = `
      <html>
        <head><style>${css}</style></head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    iframe.srcdoc = source;
};
