import OpenAI from 'openai';
import fs from 'fs';

const listen = async (prompt) => {
    const openai = new OpenAI({
        apiKey: 'sk-proj-96BXWjsS36ViDs3a5qWWT3BlbkFJksC0riqyKWU77djiYqKd' // This is also the default, can be omitted
   });  

   const audioFile = fs.createReadStream('C:/Users/ashmi/Documents/Projects/project-celebi/src/AI/stubs/speech.mp3');

   
   const transcript = await openai.audio.transcriptions.create({
       file:audioFile,
       model:"whisper-1",
   });
   
   return transcript
}

console.log('dfsdfsd', await listen())

//export default listen
