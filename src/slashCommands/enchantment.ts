import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../@types/types";
import { Character } from "../../@types/mythicTypes";

export const command : SlashCommand = {
  name: 'enchant',
  data: new SlashCommandBuilder()
    .setName('enchant')
    .setDescription('Liste des enchantements manquants'),
    
  execute: async (interaction) => {
    const messages = await interaction.channel.messages.fetch({limit: 1});

    messages.forEach((message)=>{
    if(message.author.username === "JoBot")
      message.delete()

      }
    )
    
    let memberGuild;
    let listMemberNoEnchant = [];
    
    const resGuilde = await fetch(`https://raider.io/api/v1/guilds/profile?region=eu&realm=elune&name=%C3%89dition%20Limit%C3%A9e&fields=members`)
    const guild = await resGuilde.json()
    
    const members = guild.members.filter(member => member.rank === 0 || member.rank === 2 || member.rank >= 4 && member.rank <= 6);    
    let embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Enchantement manquants :`)
    
    for (const member of members) {
      listMemberNoEnchant = [];
      memberGuild = member.character.name
      
      const resPerso = await fetch(`https://raider.io/api/v1/characters/profile?region=eu&realm=elune&name=${memberGuild}&fields=gear`)
      const characters = await resPerso.json()
      
      
      let stuffNoEnchante = '';

      for (const item in characters.gear.items) {
        
        const itemNoEnchant = characters.gear.items[item].enchant

        if (itemNoEnchant === undefined) {
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
        listMemberNoEnchant.push(`${stuffNoEnchante}\u200B`);
      } 

      if (listMemberNoEnchant.length === 0) {
        embed.addFields({ name: `${characters.name} :`, value: 'Enchentement => OK\u200B', inline: false });
      } else {
        embed.addFields({ name: `${characters.name} :`, value: listMemberNoEnchant.join('\n'), inline: false });
      }
     
       
    }
      await interaction.reply({ embeds: [embed] })
  }
}