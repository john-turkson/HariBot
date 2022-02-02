const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

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

client.login(process.env.BOT_TOKEN);