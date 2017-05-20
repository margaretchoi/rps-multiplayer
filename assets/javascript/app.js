// Initialize Firebase
var config = {
  apiKey: "AIzaSyDhaq6AofoM_WilgUEGxEUUZfg1fnf0Zyc",
  authDomain: "rps-game-7dce5.firebaseapp.com",
  databaseURL: "https://rps-game-7dce5.firebaseio.com",
  projectId: "rps-game-7dce5",
  storageBucket: "rps-game-7dce5.appspot.com",
  messagingSenderId: "874885677350"
};

firebase.initializeApp(config);

var database = firebase.database();

var playerOne = {
  name: '',
  score: 0,
  choice: ''
};

var playerTwo = {
  name: '',
  score: 0,
  choice: ''
};


var playersAll = [];
var playersWaiting = [];

// Create join game button

var joinBtn = $('<button>').attr('class','join-game').html('Join Game');

$('#player-window').append(joinBtn);


// Check the number of players and return a message or start game
checkPlayers();

//Event listener for Join Game button
$('.join-game').click('on', addPlayer);

//Add a new player
function addPlayer() {
  console.log('add');

  // Ask the player for a name
  var playerName = prompt('Choose a Username', '');

  // Add the player's name to the players window
  $('#player-window').append('<p>' + playerName + '</p>');

  // Add the player to the correct object
  if (playersAll.length === 0) {
      playerOne.name = playerName;
      playersAll.push(playerOne);
  } else if (playersAll.length === 1) {
      playerTwo.name = playerName;
      playersAll.push(playerTwo);
  } else if (playersAll.length >= 2) {
      playersWaiting.push(playerName);
  }

  console.log(playersAll);

  database.ref().set({
    players: playersAll
  });

  checkPlayers();
}

function checkPlayers() {
  $('#game-window').empty();

  if (playersAll.length === 0) {
    $('#game-window').html('Click to join game');

  } else if (playersAll.length === 1) {
    $('#game-window').html('Waiting for second player ...');

  } else if (playersAll.length === 2) {
    $('#game-window').html('Click r, p, or s to throw!')
    startGame();

  } else if (playersAll.length > 2) {
    console.log('more players');

  } 
}


function startGame () {
  console.log('Starting game ...');

  



  
}


database.ref().on("value", function(snapshot) {
  console.log('Start here');
  console.log(snapshot.val());

  // var first = $('<div>').attr('class', 'player-one-box').html('Player 1');
  // var gameMessages = $('<div>').attr('class', 'game-messages').html('lets play!');
  // var second = $('<div>').attr('class', 'player-two-box').html('Player 2');

  // $('#game-window').append(first).append(second);

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// Chat functionality

// function sendChatMessage() {
//   ref = database.ref('/chat');
//   messageField = document.querySelector('#chat-message');

//   ref.push().set(
//       name: firebase.auth().currentUser.displayName,
//       message: messageField.value
//     )

//   ref.on('child-added', function(snapshot){
//     var message = snapshot.val();
//     addChatMessage(message.name, message.message);
//   });
// }
