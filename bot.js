const tmi = require('tmi.js');

// Define configuration options
const config = require('./config.js');
const opts = {
  identity: {
    username: config.username,
    password: config.oauth 
  },
  channels: [
    "phayp",
    "kunszg"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (channel, user, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  const command = msg.split(' '); // splits message into array
  
  // test
  if (channel === '#phayp') { 
    if (command[0] === 'test') {
      client.say(channel, `peepoHappy <3 test successful`);
      console.log(`* Executed ${command[0]} command`);
    } else {
      console.log(`* Unknown command ${command[0]}`);
    }
    
    for (var i=0; i<=command.length; i++) {
      if (command[i] === 'banphrase') {
      client.say(channel, `/timeout ${user['username']} 5`)
      } 
    }
    
  }
  
  
  
  if (command[0] != 'pb') { return; } // ignore messages that don't start with pb
  
  // commands
  
  // ping
  if (command[1] === 'ping') {
    client.say(channel, `${user['username']}, pong peepoHappy`);
    console.log(`* Executed ${command[1]} command`);
  } else {
    console.log(`* Unknown command ${command[1]}`);
  }
  
  // d20
  if (command[1] === 'd20') {
    const num = rollDice();
    client.say(channel, `${user['username']}, you rolled a ${num}.`);
    console.log(`* Executed ${command[1]} command`);
  } else {
    console.log(`* Unknown command ${command[1]}`);
  }
    
  // dank
  if (command[1] === 'dank') {
    if (command[2] === user['username']) {
      client.say(channel, `${user['username']} danked themselves FeelsDankMan ...`);
      console.log(`* Executed ${command[1]} command`);
    } else {
      if (!command[2]) {
        client.say(channel, `${user['username']} danked nobody FeelsDankMan ...`);
        console.log(`* Executed ${command[1]} command`);
      } else {
        client.say(channel, `${user['username']} danked ${command[2]} FeelsDankMan !!!`)
        console.log(`* Executed ${command[1]} command`);
      }
    }
  } else {
    console.log(`* Unknown command ${command[1]}`);
  }
  
  // hug
  if (command[1] === 'hug') {
    if (command[2] === user['username']) {
      client.say(channel, `${user['username']} hugs themselves dankHug`);
      console.log(`* Executed ${command[1]} command`);
    } else {
      if (!command[2]) {
        client.say(channel, `${user['username']} had no one to hug so they hugged themselves dankHug`);
        console.log(`* Executed ${command[1]} command`);
      } else {
        client.say(channel, `${user['username']} hugs ${command[2]} dankHug`)
        console.log(`* Executed ${command[1]} command`);
      }
    }
  } else {
    console.log(`* Unknown command ${command[1]}`);
  }
  
  // vanish
  if (command[1] === 'vanish') {
    client.say(channel, `/timeout ${user['username']} 1`);
    console.log(`* Executed ${command[1]} command`);
  } else {
    console.log(`* Unknown command ${command[1]}`);
  }
  
  // pyramid
  if (command[1] === 'pyramid') {
    var a = '';
    for(var i=0; i<command[2]; i++) {
      a = row(i, command[3]);
      client.say(channel, a);
    }
    
    for(var i=command[2]; i>0; i--) {
      a = row(i, command[3]);
      client.say(channel, a);
    }
  }
  
}


// used functions

// diceroll
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}
  
// rows
function row(length, text) {
  var row = '';
  
  for (var i=0; i<length; i++) { 
    row = row + text + ' ';
  }
  
  return row;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
