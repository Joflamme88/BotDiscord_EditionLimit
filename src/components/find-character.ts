import { Character } from "../../@types/enchantment";
import fetchData from "../utils/fetchData";

export async function findCharacter(realm: string,memberName : string, fields : string) : Promise<Character>  {  
  try {


    const character : Character  = await fetchData(`https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${memberName}&fields=${fields}`)


 
  return character

  } catch (error) {

  console.error(`Une erreur s'est produite lors de la requête character : ${error.message}`);

  throw error;
  }
}