
const stopWords = new Set<string>([
    'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'd\'', 'au', 'aux', 'à', 'l\'',
    'je', 'j\'', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 
    'me', 'te', 'se', 'nous', 'vous', 'le', 'la', 'les', 'lui', 'leur', 
    'ce', 'c\'', 'cela', 'ça', 'lequel', 'laquelle', 'lesquels', 'lesquelles', 
    'moi', 'toi', 'nous', 'vous',
    'à', 'dans', 'par', 'pour', 'avec', 'sans', 'sous', 'sur', 'entre', 'chez', 
    'vers', 'depuis', 'en', 'avant', 'après', 'durant', 'contre',
    'et', 'ou', 'mais', 'donc', 'car', 'ni', 'que', 'comme',
    'très', 'trop', 'aussi', 'toujours', 'jamais', 'bien', 'mal', 'ici', 'là', 'là-bas',
    'le', 'la', 'les', 'un', 'une', 'des',
    'de', 'en', 'que', 'qui', 'quoi', 'dont', 'pourquoi', 'comment', 'quand', 'où', 'si', 'cela'
]);

export function clearRequest(request: string): Set<string> {
    request = request.replace(/'/g, "' ").replace(/[.,!?;:()]/g, ' ');
    let wordsSet: Set<string> = new Set<string>(
        request.split(/\s+/)
               .filter(Boolean)
               .map(word => word.toLowerCase())
               .filter(word => !stopWords.has(word))
      );
      return wordsSet;
}

export function getWordAfterExpert(request: string) : string {
    // Nettoyer la requête avec clearRequest
    const wordsSet = clearRequest(request);

    // Convertir la requête en tableau pour vérifier chaque mot
    const wordsArray = request.split(/\s+/);

    // Parcourir les mots et chercher "expert"
    for (let i = 0; i < wordsArray.length - 1; i++) {
        // Vérifier si le mot actuel est "expert"
        if (wordsArray[i].toLowerCase() === 'expert') {
            const nextWord = wordsArray[i + 1].toLowerCase();
        }
    }
    return ""; // Aucun mot après "expert" n'a été trouvé ou il est dans le stopWords
}
