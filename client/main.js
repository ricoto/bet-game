var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
      contractInstance = new web3.eth.Contract(window.abi, "0xE17F1b29A707a546E97B46154a6807A196e54509", {from: accounts[0]});

      $("#make_bet_button").click(makeBet);
      $("#get_game_balance_button").click(getGameBalance);
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
