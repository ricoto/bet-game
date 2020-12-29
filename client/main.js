var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var walletAddress;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
      walletAddress = accounts[0];
      contractInstance = new web3.eth.Contract(window.abi, "0xE17F1b29A707a546E97B46154a6807A196e54509", {from: walletAddress});

      $("#make_bet_button").click(makeBet);
      $("#get_game_balance_button").click(getGameBalance);
      $("#get_wallet_balance_button").click(getWalletBalance);
    });
});

async function makeBet() {
  var headsOrTails = $('input[name="headsOrTails"]:checked').val();
  var config = {
    value: web3.utils.toWei("100000000", "gwei")
  };

  var res = await contractInstance.methods.makeBet(headsOrTails == "HEADS" ? 0 : 1).send(config);
  $("#win").text(res.events.MakeBetEvent.returnValues.win ? "You win": "You lost");
}

function getGameBalance() {
   contractInstance.methods.getGameBalance().call().then(function(res) {
    $("#game_balance").text(res + " wei");
  });
}

function getWalletBalance() {
  web3.eth.getBalance(walletAddress, function(err, result) {
    $("#wallet_balance").text(result + " wei");
  });
}
