import OpenAI from 'openai';

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

export default imagine

console.log(await imagine("A person choosing plant-based meal options"))