import getChallanges from "./challenge.mjs";
import imagine from "./imagine.mjs";

const challangeMe = async (prompt) => {
    const challanges = await getChallanges(prompt)

    const response = await Promise.all(challanges.map(async c => {
        const image = await imagine(c.imagePrompt);
        return { ...c, image };
    }));

    return response

}

export default challangeMe

//console.log(await challangeMe())