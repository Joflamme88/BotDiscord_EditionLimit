import { Guild, Member } from "../../@types/membersTypes";
import fetchData from "../utils/fetchData";

export async function guildMember() : Promise<Member[]>  {  
  try {

    // find guild member for Edition Limitée
  const guild : Guild = await fetchData(`https://raider.io/api/v1/guilds/profile?region=eu&realm=elune&name=%C3%89dition%20Limit%C3%A9e&fields=members`)
    

  const members = guild.members.filter(member => member.rank === 0 || member.rank === 2 || member.rank >= 4 && member.rank <= 6)
 
  return members
  } catch (error) {
  console.error(`Une erreur s'est produite lors de la requête guildMember : ${error.message}`);
  throw error;
  }
}