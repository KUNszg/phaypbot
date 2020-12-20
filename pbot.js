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
        return;
    } 
    
    for (var i=0; i<=command.length; i++) {
        if (command[i] === 'banphrase') {
        client.say(channel, `/timeout ${user['username']} 5`)
        } 
    }
    
    }
  
    // commands
    if (command[0] != 'pb') { return; } // ignore messages that don't start with pb
  
    // ping
    if (command[1] === 'ping') {
        client.say(channel, `${user['username']}, pong peepoHappy`);
        return;
    }
  
    // d20
    if (command[1] === 'd20') {
        const num = rollDice();
        client.say(channel, `${user['username']}, you rolled a ${num}.`);
        return;
    } 

    // dank
    if (command[1] === 'dank') {
        if (command[2] === user['username']) {
            client.say(channel, `${user['username']} danked themselves FeelsDankMan ...`);
        } else {
        if (!command[2]) {
            client.say(channel, `${user['username']} danked nobody FeelsDankMan ...`);
            } else {
                client.say(channel, `${user['username']} danked ${command[2]} FeelsDankMan !!!`)
            }
        }
        return;
    } 
  
    // hug
    if (command[1] === 'hug') {
        if (command[2] === user['username']) {
            client.say(channel, `${user['username']} hugs themselves dankHug`);
        } else {
        if (!command[2]) {
            client.say(channel, `${user['username']} had no one to hug so they hugged themselves dankHug`);
            } else {
                client.say(channel, `${user['username']} hugs ${command[2]} dankHug`)
            }
        }
        return;
    } 
  
    // vanish
    if (command[1] === 'vanish') {
        client.say(channel, `/timeout ${user['username']} 1`);
        return;
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
        return;
    }

    //say
    if (command[1] === 'say') {
        var a = '';

        for (var i=2; i<command.length; i++) {
            a = a + command[i] + ' ';
        }

        client.say(channel, a);
        return;
    }

    // restart
    if (command[1] === "restart" && (user['user-id'] === "97517466" || user['user-id'] === "178087241")) { // twitch id of phayp and kunszg
        if (process.platform === "win32") {
          client.say(channel, 'This command cannot be ran outside of Linux, you should use it on server version of the bot :)');
          return;
        }

        try {
          const shell = require('child_process');

          const pullFromRepo = shell
            .execSync('sudo git pull')
            .toString()
            .split('\n')

          if (pullFromRepo[0].toLowerCase().includes('already up to date')) {
            client.say(channel, `peepoHapyp bot is already up to date`);
            return;
        }

        const formattedResponse = pullFromRepo[0].toLowerCase().split('.')[0] + 
            ' | ' + pullFromRepo.splice(3).join('\n').replace(/-{2,}/g, "").replace(/\+{2,}/g, "");

        client.say(channel, `peepoHappy ${formattedResponse}`);
                      
        setTimeout(() => {
            shell.execSync(`sudo pm2 restart bot`);
        }, 1000);
        return;
        } catch (err) {
            console.log(err)
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
  client.say('#phayp', 'hi peepoHappy');
}
