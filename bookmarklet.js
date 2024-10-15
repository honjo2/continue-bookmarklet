javascript:(async function() {
  const query = prompt('検索文字列', '戸越銀座');
  if (!query) return;

  const newWindow = open();
  const iframeHTML = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;">
        <iframe id="contentFrame" src="${location}" style="border:none;width:100vw;height:100vh;"></iframe>
      </body>
    </html>
  `;

  with (newWindow.document) {
    write(iframeHTML);
    close();
  }

  /* DOMがロードされるまで待つ */
  function waitForDocumentLoad(iframe, interval = 1000, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const intervalId = setInterval(() => {
        try {
          const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

          if (iframeDocument.readyState === 'complete') {
            clearInterval(intervalId);
            resolve();
          }

          if (Date.now() - startTime > timeout) {
            clearInterval(intervalId);
            reject(new Error('Document load timed out'));
          }
        } catch (error) {
          clearInterval(intervalId);
          reject(error);
        }
      }, interval);
    });
  }

  /* DOMがロードされてからJSでDOMが操作される場合はこれを使う */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* 対象の画面でやりたい処理 */
  function search(iframe, query) {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const textarea = iframeDocument.getElementById('APjFqb');
    textarea.value = query;
    textarea.form.submit();
  }

  const iframe = newWindow.document.getElementById('contentFrame');

  await waitForDocumentLoad(iframe);
  /* await delay(2000); */

  /* カスタム処理 */
  search(iframe, query);
  await waitForDocumentLoad(iframe);
  search(iframe, '文庫の森');
})();
