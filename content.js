(function () {
  var mo = new MutationObserver(process);
  mo.observe(document, { subtree: true, childList: true });
  document.addEventListener("DOMContentLoaded", function () {
    mo.disconnect();
  });

  function process(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var nodes = mutations[i].addedNodes;
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (n.nodeType != 1)
          continue;

        var txHash = document.getElementById("spanTxHash");
        var txHashIcon = document.getElementById("spanTxHashLinkIcon");

        var btn = document.getElementById("cancel");
        if (txHash && txHashIcon && !btn) {
          var gasUsed = document.getElementById("ContentPlaceHolder1_spanGasUsedByTxn")
            .innerText.trim();
          if (!gasUsed.toLowerCase().includes("pending"))
            return;

          var button = document.createElement("button");
          button.innerHTML = "Cancel";
          button.id = "cancel";
          button.type = "button";
          txHash.parentElement.parentElement.appendChild(button);

          var theButton = document.getElementById("cancel");
          theButton.addEventListener("click", function () {
            var hash = document.getElementById("spanTxHash").innerHTML.trim();
            var from = document.getElementById("addressCopy").innerHTML.trim();
            var nonceEl = document.getElementById("ContentPlaceHolder1_spanNonce")
              .parentElement
              .parentElement
              .children[1]
              .children[0];
            if(!nonceEl) {
              nonceEl = document.getElementById("ContentPlaceHolder1_spanNonce")
              .parentElement
              .parentElement
              .children[1];
            }
            var nonce = nonceEl.innerHTML.trim();

            let event = new CustomEvent("CANCEL_TX", { detail: { txHash: hash, from, nonce } });
            window.dispatchEvent(event);
          });
        }
      }
    }
  }
})();

var script = document.createElement("script");
script.src = chrome.extension.getURL("pageScript.js");
(document.head || document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
