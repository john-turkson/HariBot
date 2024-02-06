const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    
    // Set Name and Description of Ping command
    .setName('ping')
    .setDescription('Replies with Pong!'),

    //Trigger Response
    async execute(interaction) {
        await interaction.reply('Pong!');
    },


};