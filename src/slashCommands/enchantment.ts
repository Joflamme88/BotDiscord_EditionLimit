import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../@types/types";

import { guildMember } from "../components/find-guild-member";
import { findCharacter } from "../components/find-character";

export const command : SlashCommand = {
  name: 'enchant',
  data: new SlashCommandBuilder()
    .setName('enchant')
    .setDescription('Liste des enchantements manquants'),
    
  execute: async (interaction) => {

    const messages = await interaction.channel.messages.fetch({limit: 1});
    
    await interaction.deferReply();
 
    // list guild raider member
    const members = await guildMember()

    let embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Enchantement manquants :`)
    
    for (const member of members) {
     let  listMemberNoEnchant = [];
     let stuffNoEnchant = '';
     const fields = "gear"


      // find character details by realm and memberName
      const characters = await findCharacter(member.character.realm,member.character.name,fields)

      

      for (const item in characters.gear.items ) {
        
        const itemNoEnchant = characters.gear.items[item].enchant

        if (itemNoEnchant === undefined) {
          switch (item) {
            case 'back': stuffNoEnchant += `back\n`;
              break;
            case 'chest': stuffNoEnchant += `Torse\n`;
              break;
            case 'wrist': stuffNoEnchant += `Bracelets\n`;
              break;
            case 'legs': stuffNoEnchant += `Jambe\n`;
              break;
            case 'feet': stuffNoEnchant += `Pieds\n`;
              break;
            case 'fringer1': stuffNoEnchant += `Anneau 1\n`;
              break;
            case 'finger2': stuffNoEnchant += `Anneau 2\n`;
              break;
            case 'mainhand': stuffNoEnchant += `Arme\n`;
              break;
          }
        }
      };
    
      if (stuffNoEnchant != '') {
        listMemberNoEnchant.push(`${stuffNoEnchant}\u200B`);
      } 

      if (listMemberNoEnchant.length === 0) {
        embed.addFields({ name: `${characters.name} :`, value: 'Enchantement => OK\u200B', inline: false });
      } else {
        embed.addFields({ name: `${characters.name} :`, value: listMemberNoEnchant.join('\n'), inline: false });
      }  
    }

      if(messages){
        messages.forEach((message)=>{
          if(message.interaction &&  message.interaction.commandName === "enchant")
          message.delete()
        })
      }
      await interaction.editReply({ embeds: [embed] });
     
  }
}