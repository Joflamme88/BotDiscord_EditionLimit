
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../@types/types";
import { Character, Guild } from "../../@types/membersTypes";
import  fetchData  from "../utils/fetchData"

export const command : SlashCommand = {
  name: 'ilvl',
  data: new SlashCommandBuilder()
    .setName('ilvl')
    .setDescription('Ilvl des membres de la guilde')
    .addStringOption((option) => {
      return option
      // .setName('keylevel')
      // .setDescription('Niveau clé MM+')
      .setRequired(true)
    }),

  execute: async (interaction) => {
    
  
        

  }
}