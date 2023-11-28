
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../@types/types";
import { Character, Guild } from "../../@types/membersTypes";
import  fetchData  from "../utils/fetchData"

export const command : SlashCommand = {
  name: 'ilvl',
  data: new SlashCommandBuilder()
    .setName('ilvl')
    .setDescription('Ilvl des membres de la guilde'),
  

    execute: async (interaction) => {

      const messages = await interaction.channel.messages.fetch({limit: 1});
      
      let memberGuild : string = '';
      let listMemberNoEnchant = [];
      
      await interaction.deferReply();
      
      const guild : Guild = await fetchData(`https://raider.io/api/v1/guilds/profile?region=eu&realm=elune&name=%C3%89dition%20Limit%C3%A9e&fields=members`)
      
  
      const members = guild.members.filter(member => member.rank === 0 || member.rank === 2 || member.rank >= 4 && member.rank <= 6);    
  
      let embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Enchantement manquants :`)
      
      for (const member of members) {
        listMemberNoEnchant = [];
        memberGuild = member.character.name
  
  
        
        const characters : Character  = await fetchData(`https://raider.io/api/v1/characters/profile?region=eu&realm=elune&name=${memberGuild}&fields=gear`)
        
        
        
  
        
  
      }
    }
}