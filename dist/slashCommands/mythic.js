"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'mythic',
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mythic')
        .setDescription('Liste des MM+ de la semaine')
        .addStringOption((option) => {
        return option
            .setName('levelkey')
            .setDescription('Message à afficher')
            .setRequired(true);
    }),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield interaction.channel.messages.fetch({ limit: 1 });
        messages.forEach((message) => {
            if (message.author.username === "JoBot")
                message.delete();
        });
        const keyFocus = Number(interaction.options.get('levelkey').value.toString());
        let memberGuild;
        let dungeonMythic = [];
        const resGuilde = yield fetch(`https://raider.io/api/v1/guilds/profile?region=eu&realm=elune&name=%C3%89dition%20Limit%C3%A9e&fields=members`);
        const guild = yield resGuilde.json();
        const members = guild.members.filter(member => member.rank === 0 || member.rank === 2 || member.rank >= 4 && member.rank <= 6);
        let embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Mythique ${keyFocus}+ :`);
        for (const member of members) {
            dungeonMythic = [];
            memberGuild = member.character.name;
            const resPerso = yield fetch(`https://raider.io/api/v1/characters/profile?region=eu&realm=Elune&name=${memberGuild}&fields=mythic_plus_weekly_highest_level_runs`);
            const characters = yield resPerso.json();
            if (characters.mythic_plus_weekly_highest_level_runs.length === 0) {
                embed.addFields({ name: `${characters.name} :`, value: `Pas de MM+ fait cette semaine\u200B`, inline: false });
            }
            else {
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
                    if (levelData >= keyFocus)
                        dungeonMythic.push(`${levelData} - ${dungeonData} => ${dateJavaScript}\u200B`);
                });
                if (dungeonMythic.length === 0) {
                    embed.addFields({ name: `${characters.name} :`, value: 'Pas de MM+ fait cette semaine\u200B', inline: false });
                }
                else {
                    embed.addFields({ name: `${characters.name} :`, value: dungeonMythic.join('\n'), inline: false });
                }
            }
        }
        yield interaction.reply({ embeds: [embed] });
    })
};
