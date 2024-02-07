const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const axios = require('axios');
const { fortAPI_Token } = require('../../config/config.json');

function filterShopItems(itemtype, shopItems) {

    let theItemtype = itemtype;
  
    if (shopItems.length == 0) {
      console.log(`Shop Items is empty!`);
      return;
    }
  
    const filteredShopItems = shopItems.filter((desiredItems) => {
      switch (theItemtype) {
        case 'songs':
          return desiredItems.type == 'sparks_songs'
        
        case 'skins':
          return desiredItems.type == 'outfits'
  
        case 'emotes':
          return desiredItems.type == 'emote'  
  
        case 'gliders':
          return desiredItems.type == 'glider'
        
        case 'pickaxes':
          return desiredItems.type == 'pickaxe'
  
        case 'wraps':
          return desiredItems.type == 'wrap'
        
        case 'bundles':
          return desiredItems.type == 'bundle'
  
        default:
          return desiredItems
      }
    })
  
    return filteredShopItems;
  
  }
  
  
  async function getShopItems() {
    try {
  
      const headers = {
          'Authorization': fortAPI_Token,
          'Content-Type': 'application/json'
      }
    
      // Make API call using Axios
      const response = await axios.get('https://fortniteapi.io/v2/shop?lang=en', {headers});
    
      const apiData = response.data.shop;
  
      const shopItems = apiData.map((item) => {
        return {
          name: item.displayName,
          type: item.mainType,
          image: item.displayAssets[0].background,
          price: item.price.finalPrice,
          rarity: item.rarity.id
        }
      })
    
      return shopItems;
    
     } catch (error) {
      console.error(`Error fetching data from API`, error);
     }
  }

  function capitalizeFirstLetter(string) {
    return string.replace(/^\w/, (c) => c.toUpperCase());
  }
  

module.exports = {
    data: new SlashCommandBuilder()
    
    // Set Name and Description of Ping command
    .setName('distype')
    .setDescription('(Daily Item Shop) Check What Items are currently in the Shop.')
    .addStringOption(option => 
        option.setName('itemtypes')
        .setDescription('Select What Items you want to see.')
        .setRequired(true)
        .addChoices(
            {name: 'Festival Songs', value: 'songs'},
            {name: 'Fortnite Emotes', value: 'emotes'},
            {name: 'Fortnite Wraps', value: 'wraps'},
        )
    ),

    //Trigger Response
    async execute(interaction) {
       try {

        // const selectedType = interaction.options.getString('itemtypes');

        // const dailyFortniteShopItems = await getShopItems();

        // const filteredShopItems = filterShopItems(selectedType, dailyFortniteShopItems);

        // console.log(filteredShopItems);

        await interaction.reply('Currently Out of Order!');
        
       } catch (error) {
        console.error(`Error fetching data from API`, error);

        await interaction.reply(`There was an error while fetching data from the API.`)

       }
    },


};