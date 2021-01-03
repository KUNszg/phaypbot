#!/usr/bin/env node
'use strict';

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
    "kunszg",
    "axo__",
    "senderak",
    "mrolle_"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('chat', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// peepo swing
const peepoSwingCount = 0;

// Called every time a message comes in
function onMessageHandler (channel, user, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    const command = msg.split(' '); // splits message into array
  
    if (channel === '#phayp') { 
        // test
        if (command[0] === 'test') { 
            client.say(channel, `peepoHappy <3 test successful`);
            return;
        } 
    
        // banphrase
        for (let i=0; i<=command.length; i++) {
            if (((command[i] === 'peepoSad') || (command[i] === 'peepoSadMan') || (command[i] === 'FeelsBadMan')) 
                && ((command[i+1] === '🔫') || (command[i+1] === 'nymnGun'))) {
                    client.say(channel, `/timeout ${user['username']} 1`);
            } 
        }

        // peepoSwing
        let peepoSwing = false;
        for (let i=0; i<=command.length; i++) {
            if (command[i] === 'peepoSwing') {
                peepoSwing = true;
            }
        }
        if (peepoSwing === true) {
            peepoSwingCount++;
            client.say(channel, `peepoSwing peepo has swung ${peepoSwingCount} times`);
        }
    }
  
    // commands
    if (command[0] != 'pb') { return; } // ignore messages that don't start with pb
  
    // ping
    if (command[1] === 'ping') {
        client.say(channel, `${user['username']}, pong peepoHappy`);
        return;
    }
  
    // roll
    if (command[1] === 'roll') {
        const num = rollDice(command[2]);
        client.say(channel, `${user['username']}, you rolled a ${num} peepoHappy`);
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
            client.say(channel, `${user['username']} has no one to hug peepoSad`);
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
        const length = command[2];
        const text1 = command[3];
        const text2 = command[4];

        let a = '';
        
        if (text1.charAt(0) === '/' && text2.charAt(0) === '/') {
            client.say(channel, `${user['username']}, FeelsDankMan`)
        } else if (length <= 5 || ((channel === "#phayp" || channel === "#axo__") && length<=20)) {
            for(let i=0; i<length; i++) {
                a = row(i, text1, text2);
                client.say(channel, a);
            }
            for(let i=length; i>0; i--) {
                a = row(i, text1, text2);
                client.say(channel, a);
            }
        } else if (length>5) {
            client.say(channel, `${user['username']}, pyramid is too big FeelsDankMan`);
        } else {
            client.say(channel, `${user['username']}, FeelsDankMan ...`);
        }
        return;
    }

    // say
    if (command[1] === 'say') {
        let a = '';
        
        if (command[2].charAt(0) === '/') {
            client.say(channel, `${user['username']}, FeelsDankMan`)
        } else {
            for (let i=2; i<command.length; i++) {
                a = a + command[i] + ' ';
            }

            client.say(channel, a);
        }
        return;
    }

    // coinflip 
    if (command[1] === "coinflip") {
        if (Math.random()<0.5) {
            client.say(channel, `${user['username']}, heads peepoHappy`);
        } else {
            client.say(channel, `${user['username']}, tails peepoHappy`);
        } 

        return;
    } 

    // command list
    if (command[1] === "commands" || command[1] === "help") {
        client.say(channel, `${user['username']}, currently available commands: dank, hug, ping, pyamid, say, vanish peepoHappy`);
        return;
    } 

    // restart
    if (command[1] === "restart" && (user['user-id'] === "97517466" || user['user-id'] === "178087241")) { // twitch id of phayp and kunszg
        if (process.platform != "linux") {
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
                client.say(channel, `peepoHappy bot is already up to date`);
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


// functions used in commands

// diceroll
function rollDice (sides) {
    return Math.floor(Math.random() * sides) + 1;
}
  
// rows (used for pyramids)
function row(length, text1, text2) {
    let row = '';

    if (!text2) {
        for (let i=0; i<length; i++) {
                row = row + text1 + ' ';
            }
    } else {
        for (let i=0; i<length; i++) {
            if(Math.random()<0.5) {
                row = row + text1 + ' ';
            } else {
                row = row + text2 + ' ';
            }
        }
    }
    return row;
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    client.say('#phayp', 'hi peepoHappy');
}
