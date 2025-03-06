import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

const prefix = "Donne moi uniquement l'id et le nom de l'article qui se rapproche le plus de cette question sous format { id: xxxxxxx, titre: 'titre'}";

let sentence = "Phrase de test, à changer par l'input de l'utilisateur";

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
sentence = sentence.replace(/'/g, "' ").replace(/[.,!?;:()]/g, ' ');

let wordsSet: Set<string> = new Set<string>(
  sentence.split(/\s+/)
         .filter(Boolean)
         .map(word => word.toLowerCase())
         .filter(word => !stopWords.has(word))
);
const wordCount = new Map<string, number>();
for(let word of wordsSet) {
    //GET ARTICLES BY DOMAIN OR TAGS

}


/*async function getChatResponse() {
  const chatResponse = await client.chat.complete({
    model: 'mistral-large-latest',
    messages: [{role: 'user', content: 'What is the best French cheese?'}],
  });

  console.log('Chat:', chatResponse.choices[0].message.content);
}

getChatResponse();*/