export default function setIframeContent(
    iframe: HTMLIFrameElement,
    { html, css, js }: { html: string; css: string; js: string }
) {
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
}