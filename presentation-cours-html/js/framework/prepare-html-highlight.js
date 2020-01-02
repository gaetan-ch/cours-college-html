(function () {
    hljs.initHighlightingOnLoad();

    for (let htmlBlock of document
        .querySelectorAll('code.xml')) {
        htmlBlock.innerHTML = htmlBlock.innerHTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&apos;');
        hljs.highlightBlock(htmlBlock);
    }
})();
