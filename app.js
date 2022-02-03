const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const PREFIX = '!';

//Load bot token from .env file
require("dotenv").config({path:'./config/keys.env'});

client.on('ready', () => {
	console.log(`${client.user.tag} is online!`);
});

client.on("messageCreate", message => {
    if (message.content == 'hi') {
        message.reply(`Hello ${message.author.username}!`);
    }
})

client.on('message', message => {
    
    let args = message.contenet.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        
        case 'play':

        if (!args[1]) {
            message.channel.send("Please provide a valid youtube link!");
        }

        break;
    }

})

client.login(process.env.BOT_TOKEN);