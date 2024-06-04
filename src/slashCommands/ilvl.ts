
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../@types/types";

import { guildMember } from "../components/find-guild-member";
import { findCharacter } from "../components/find-character";

export const command : SlashCommand = {
  name: 'ilvl',
  data: new SlashCommandBuilder()
    .setName('ilvl')
    .setDescription('Ilvl des membres de la guilde'),
  

    execute: async (interaction) => {

      const messages = await interaction.channel.messages.fetch({limit: 1});
      
      await interaction.deferReply();
   
      // list guild raider member
      const members = await guildMember()
      const dateNow =  new Date().toLocaleString()

      let embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Ilvl : ${dateNow}`)
      
      for (const member of members) {
       let ilvlData : number = 0;
       const fields = "gear"
  
  
        // find character details by realm and memberName
        const characters = await findCharacter(member.character.realm,member.character.name,fields)

  
        ilvlData = characters.gear.item_level_equipped
          
        embed.addFields({ name: `${characters.name} :`, value: ilvlData.toString(), inline: false });

      }

        if(messages){
          messages.forEach((message)=>{
            if(message.interaction &&  message.interaction.commandName === "Ilvl")
            message.delete()
          })
        }
        await interaction.editReply({ embeds: [embed] });
       
  }
}