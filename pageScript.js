window.addEventListener("load", async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {
            console.error(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        console.log("Acccounts always exposed");
    }
    // Non-dapp browsers...
    else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
});

window.addEventListener("CANCEL_TX", (event) => {
    console.log(event);
    web3.eth.sendTransaction({
        from: event.detail.from,
        to: event.detail.from,
        value: 0,
        nonce: +event.detail.nonce
    }, console.log);
}, false);