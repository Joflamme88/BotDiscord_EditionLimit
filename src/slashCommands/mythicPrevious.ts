import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../@types/types";
import { guildMember } from "../components/find-guild-member";
import { findCharacter } from "../components/find-character";

export const command : SlashCommand = {
  name: 'mythicprevious',
  data: new SlashCommandBuilder()
    .setName('mythicprevious')
    .setDescription('Liste des MM+ de la semaine précédente')
    .addStringOption((option) => {
      return option
      .setName('keylevel')
      .setDescription('Niveau clé MM+')
      .setRequired(true)
    }),

  execute: async (interaction) => {

    const keyLevel = Number(interaction.options.get('keylevel').value.toString());


    const messages = await interaction.channel.messages.fetch({limit: 1});

    let memberGuild : string = '';
    let dungeonMythic = [];
    
    await interaction.deferReply();

     // list guild raider member
     const members = await guildMember()

     let embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Mythique ${keyLevel}+ :`)
    
    for (const member of members) {
      dungeonMythic = [];
      const fields = "mythic_plus_weekly_highest_level_runs"

    // find character details by realm and memberName
    const characters = await findCharacter(member.character.realm,member.character.name,fields)

      
      if(characters.mythic_plus_previous_weekly_highest_level_runs.length === 0){

        embed.addFields({ name: `${characters.name} :`, value: `Pas de MM+ fait cette semaine\u200B`, inline : false });
      } else {
        characters.mythic_plus_previous_weekly_highest_level_runs.forEach((mythic) => {
          
          const dungeonData = mythic.dungeon;
          const levelData = mythic.mythic_level;
          const dateData = mythic.completed_at;
          // ------ Transform Date format ------- //
          const date = new Date(dateData);
          const jour = date.getDate();
          const mois = date.getMonth() + 1; // Notez que les mois sont indexés à partir de 0
          const annee = date.getFullYear();
          const dateJavaScript = jour + "/" + mois + "/" + annee;
          
          
          if(levelData >= keyLevel) dungeonMythic.push(`${levelData} - ${dungeonData} => ${dateJavaScript}\u200B`);
          
        });
             
        if (dungeonMythic.length === 0) {
          embed.addFields({ name: `${characters.name} :`, value: 'Pas de MM+ fait la semaine dernière\u200B', inline: false });
        } else {
          embed.addFields({ name: `${characters.name} :`, value: dungeonMythic.join('\n'), inline: false });
        }
       
      }
    }

    if(messages){
      messages.forEach((message)=>{
        if(message.interaction.commandName === "mythicprevious")
        message.delete()
      })
    }
    await interaction.editReply({ embeds: [embed] });
  }
}