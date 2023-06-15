require('dotenv').config();
const token = process.env.TOKEN

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');


const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
})

bot.once('ready', async () => {
  console.log('Félicitations, votre bot Discord a été correctement initialisé !')


});

const prefix = "!";

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "enchant") {
    let memberGuild;
    let listMemberNoEnchant = [];

    const resGuilde = await fetch(`https://raider.io/api/v1/guilds/profile?region=eu&realm=elune&name=%C3%89dition%20Limit%C3%A9e&fields=members`)
    const guild = await resGuilde.json()

    const members = guild.members.filter(member =>  member.rank >= 4 && member.rank <= 6);


    for (const member in members) {
      memberGuild = members[member].character.name


      const resPerso = await fetch(`https://raider.io/api/v1/characters/profile?region=eu&realm=elune&name=${memberGuild}&fields=gear`)
      const characters = await resPerso.json()

      let stuffNoEnchante = '';
      const user = message.author
      for (item in characters.gear.items) {

        const itemNoEnchant = characters.gear.items[item].enchant

        if (itemNoEnchant == undefined) {
          switch (item) {
            case 'back': stuffNoEnchante += `back\n`;
              break;
            case 'chest': stuffNoEnchante += `Torse\n`;
              break;
            case 'wrist': stuffNoEnchante += `Bracelets\n`;
              break;
            case 'legs': stuffNoEnchante += `Jambe\n`;
              break;
            case 'feet': stuffNoEnchante += `Pieds\n`;
              break;
            case 'fringer1': stuffNoEnchante += `Anneau 1\n`;
              break;
            case 'finger2': stuffNoEnchante += `Anneau 2\n`;
              break;
            case 'mainhand': stuffNoEnchante += `Arme\n`;
              break;
          }
        }
      };
    
      if (stuffNoEnchante != '') {
        const noEnchant = { name: `${memberGuild} :`, value: `${stuffNoEnchante}\u200B` };
        listMemberNoEnchant.push(noEnchant);
        
      } 

    }
    let embed;
    embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Enchantement manquant :')
      .addFields(...listMemberNoEnchant)
      .setTimestamp()
    // Envoyer l'incorporation dans le même canal
    message.channel.send({ embeds: [embed] });





  }
})

bot.login(token)

