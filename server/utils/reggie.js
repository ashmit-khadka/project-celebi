const { OpenAI } = require('openai');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const { parse } = require('best-effort-json-parser');

const openai = new OpenAI({
  apiKey: 'sk-proj-KE5wcbahnCSNV3bmO5TPT3BlbkFJZu8vQChanm5qlN7GRLiG' // This is also the default, can be omitted
});  


const chat = async (message, conversation) => {
  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      ...conversation,
      {
        role: 'user',
        content: message
      }
    ]
  });
}


const getChallanges = async (prompt) => {    
  const base = await readFile('./server/utils/challengePrompt.txt', 'utf8');
  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
          {
              role: "system",
              content: base
          },
          {
              role: "user",
              content: `${prompt}, give me some challenges can I do to contribute towards the sustainable development goals`
          }
      ]
  });
  
  const message = response.choices[0].message.content
  return parse(message)
  
}


const imagine = async (prompt) => {
  const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: 'sk-proj-96BXWjsS36ViDs3a5qWWT3BlbkFJksC0riqyKWU77djiYqKd' // This is also the default, can be omitted
 });  
 
 const response = await openai.images.generate({
     model:"dall-e-3",
     prompt:`${prompt}, studio ghibli style`,
     size:'1024x1024',
     quality:"standard",
     n:1,
 });
 
 const url = response.data[0].url
 return url
}

const challangeMe = async (prompt) => {
  const challanges = await getChallanges(prompt)

  const response = await Promise.all(challanges.map(async c => {
      const image = await imagine(c.imagePrompt);
      return { ...c, image };
  }));

  return response

}



module.exports = {
  chat,
  getChallanges,
  imagine,

  challangeMe
}