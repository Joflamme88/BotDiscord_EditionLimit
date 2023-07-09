export default async function fetchData(url : string) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la requête : ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Une erreur s'est produite lors de la requête : ${error.message}`);
    throw error;
  }
}