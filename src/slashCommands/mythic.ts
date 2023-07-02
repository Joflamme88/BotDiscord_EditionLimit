import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../@types/types";
import { Character } from "../../@types/mythicTypes";

export const command : SlashCommand = {
  name: 'mythic',
  data: new SlashCommandBuilder()
    .setName('mythic')
    .setDescription('Liste des MM+ de la semaine')
    .addStringOption((option) => {
      return option
        .setName('levelkey')
        .setDescription('Message à afficher')
        .setRequired(true)
  }),

  execute: async (interaction) => {
    const messages = await interaction.channel.messages.fetch({limit: 1});

    messages.forEach((message)=>{
    if(message.author.username === "JoBot")
      message.delete()

      }
    )
 
    const keyFocus = Number(interaction.options.get('levelkey').value.toString());
   
    let memberGuild;
    let dungeonMythic = [];
    
    const resGuilde = await fetch(`https://raider.io/api/v1/guilds/profile?region=eu&realm=elune&name=%C3%89dition%20Limit%C3%A9e&fields=members`)
    const guild = await resGuilde.json()
    
    const members = guild.members.filter(member => member.rank === 0 || member.rank === 2 || member.rank >= 4 && member.rank <= 6);
    
    let embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Mythique ${keyFocus}+ :`)
    
    for (const member of members) {
      dungeonMythic = [];
      
      memberGuild = member.character.name
      
      const resPerso = await fetch(`https://raider.io/api/v1/characters/profile?region=eu&realm=Elune&name=${memberGuild}&fields=mythic_plus_weekly_highest_level_runs`)
      const characters : Character = await resPerso.json()
      
      
      if(characters.mythic_plus_weekly_highest_level_runs.length === 0){

        embed.addFields({ name: `${characters.name} :`, value: `Pas de MM+ fait cette semaine\u200B`, inline : false });
      } else {
        characters.mythic_plus_weekly_highest_level_runs.forEach((mythic) => {
          
          const dungeonData = mythic.dungeon;
          const levelData = mythic.mythic_level;
          const dateData = mythic.completed_at;
          // ------ Transform Date format ------- //
          const date = new Date(dateData);
          const jour = date.getDate();
          const mois = date.getMonth() + 1; // Notez que les mois sont indexés à partir de 0
          const annee = date.getFullYear();
          const dateJavaScript = jour + "/" + mois + "/" + annee;
          
          
          if(levelData >= keyFocus) dungeonMythic.push(`${levelData} - ${dungeonData} => ${dateJavaScript}\u200B`);
          
        });
             
        if (dungeonMythic.length === 0) {
          embed.addFields({ name: `${characters.name} :`, value: 'Pas de MM+ fait cette semaine\u200B', inline: false });
        } else {
          embed.addFields({ name: `${characters.name} :`, value: dungeonMythic.join('\n'), inline: false });
        }
       
      }
    }
    await interaction.reply({ embeds: [embed] })
  }
}