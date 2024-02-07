const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config/config.json')

//Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

//Initialize New Collection
client.commands = new Collection();

function retriveCommands() {
   
  // Return array of all folder names in "commands folder"
  const folderPath = path.join(__dirname, "commands");
  const commandsFolder = fs.readdirSync(folderPath);

  for (const folder of commandsFolder) {

    // Return array of all .js files within "commands" subfolders
    const commandsPath = path.join(folderPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);


    //   Check that .js files have data and execute properties
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
}

function handleCommandInteractions() {

  client.on(Events.InteractionCreate, async (interaction) => {

    // If command is not a '/'
    if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

    // Check if there's no command matching the interaction's commandName
    if (!command) {
        
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;

    }

    try {

      // Attempt to execute the command with the interaction as an argument
      await command.execute(interaction);

    } catch (error) {

      console.error(error);

      // Check if the interaction has already been replied to or deferred
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
        
      } else {

        // If not already replied or deferred, reply with an ephemeral message
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });

      }
    }

  });
}


// Retrive Commands from "Commands Directory"
retriveCommands();
handleCommandInteractions();


//When client is ready, run code:
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//Login to Discord with Client Token
client.login(token);