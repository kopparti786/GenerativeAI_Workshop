require('dotenv').config();
const {GoogleGenAI} = require('@google/genai')

const apikey = process.env.GEMINI_API_KEY;
if(!apikey){
    console.log("CRITICAL ERROR: GEMINIE_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenAI({apiKey:apikey});


async function generateProductDescription(productName, features){
    const prompt = `you are an expert e-commerce copywriter. write a catchy,SEO-friendly product description (max 100 words) from: ${productName}.Key features to highlight: ${features}.Tone: Professional yet exciting.just as string`;

    try{
        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return result.text.toString();
    }
    catch(error){
        console.error("Error generating product description: ", error);
        return "Description unavailable";
    }
}

module.exports = generateProductDescription;