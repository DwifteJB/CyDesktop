/* ESM HOOK ALLOWS USE OF ES6 MODULES :) */
window.$ = window.jQuery = require('jquery');

(async () => {
    const CRD = await import("./cydiarepodownloader/index.js");
    console.log(CRD)
    console.log(CRD.default())
    const parsedJSON = await CRD.parseRepo("https://repo.packix.com/");
    document.body.innerHTML = parsedJSON
    console.log(JSON.parse(parsedJSON));
})();
