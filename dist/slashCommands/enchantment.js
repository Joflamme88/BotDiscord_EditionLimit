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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const fetchData_1 = __importDefault(require("../utils/fetchData"));
exports.command = {
    name: 'enchant',
    data: new discord_js_1.SlashCommandBuilder()
        .setName('enchant')
        .setDescription('Liste des enchantements manquants'),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield interaction.channel.messages.fetch({ limit: 1 });
        let memberGuild = '';
        let listMemberNoEnchant = [];
        yield interaction.deferReply();
        const guild = yield (0, fetchData_1.default)(`https://raider.io/api/v1/guilds/profile?region=eu&realm=elune&name=%C3%89dition%20Limit%C3%A9e&fields=members`);
        const members = guild.members.filter(member => member.rank === 0 || member.rank === 2 || member.rank >= 4 && member.rank <= 6);
        let embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Enchantement manquants :`);
        for (const member of members) {
            listMemberNoEnchant = [];
            memberGuild = member.character.name;
            const characters = yield (0, fetchData_1.default)(`https://raider.io/api/v1/characters/profile?region=eu&realm=elune&name=${memberGuild}&fields=gear`);
            let stuffNoEnchante = '';
            for (const item in characters.gear.items) {
                const itemNoEnchant = characters.gear.items[item].enchant;
                if (itemNoEnchant === undefined) {
                    switch (item) {
                        case 'back':
                            stuffNoEnchante += `back\n`;
                            break;
                        case 'chest':
                            stuffNoEnchante += `Torse\n`;
                            break;
                        case 'wrist':
                            stuffNoEnchante += `Bracelets\n`;
                            break;
                        case 'legs':
                            stuffNoEnchante += `Jambe\n`;
                            break;
                        case 'feet':
                            stuffNoEnchante += `Pieds\n`;
                            break;
                        case 'fringer1':
                            stuffNoEnchante += `Anneau 1\n`;
                            break;
                        case 'finger2':
                            stuffNoEnchante += `Anneau 2\n`;
                            break;
                        case 'mainhand':
                            stuffNoEnchante += `Arme\n`;
                            break;
                    }
                }
            }
            ;
            if (stuffNoEnchante != '') {
                listMemberNoEnchant.push(`${stuffNoEnchante}\u200B`);
            }
            if (listMemberNoEnchant.length === 0) {
                embed.addFields({ name: `${characters.name} :`, value: 'Enchantement => OK\u200B', inline: false });
            }
            else {
                embed.addFields({ name: `${characters.name} :`, value: listMemberNoEnchant.join('\n'), inline: false });
            }
        }
        if (messages) {
            messages.forEach((message) => {
                if (message.interaction.commandName === "enchant")
                    message.delete();
            });
        }
        yield interaction.editReply({ embeds: [embed] });
    })
};
