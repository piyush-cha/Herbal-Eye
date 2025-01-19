import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBnGORzTJuse6DxPU9uavsd51CVmWaJNzI';
const genAI = new GoogleGenerativeAI(API_KEY);

const LANGUAGE_PROMPTS = {
  en: "Provide detailed information about",
  hi: "इस पौधे के बारे में विस्तृत जानकारी प्रदान करें:",
  mr: "या वनस्पतीची सविस्तर माहिती द्या:"
};

export async function identifyPlantFromImage(imageBase64) {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Prepare the image data
    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg"
      }
    };

    // Create prompt for plant identification
    const prompt = "Identify this plant and provide its common name, scientific name, and brief description. If you're not completely certain, please indicate your confidence level.";

    // Generate content
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    // Parse and structure the response
    return {
      success: true,
      data: text,
      confidence: response.candidates?.[0]?.safetyRatings?.[0]?.probability || "UNKNOWN"
    };

  } catch (error) {
    console.error('Error in plant identification:', error);
    return {
      success: false,
      error: error.message || 'Failed to identify plant',
      details: error
    };
  }
}

export async function getPlantInformation(plantName, language = 'en') {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create a prompt based on the selected language
    const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.en;
    
    let prompt = `${basePrompt} ${plantName}. Include the following sections:
    1. Description
    2. Growing conditions
    3. Care instructions
    4. Medical or cultural significance
    5. Common uses
    
    Please provide this information in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}.
    Format the response in a conversational, easy-to-understand way.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      data: text,
      language
    };

  } catch (error) {
    console.error('Error fetching plant information:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch plant information',
      details: error
    };
  }
}

export async function chatWithGeminiAboutPlant(plantName, userMessage, language = 'en') {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: `I want to learn about ${plantName}. Please respond in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}.`,
        },
        {
          role: "model",
          parts: `I'll be happy to help you learn about ${plantName} in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}.`,
        },
      ],
    });

    // Send user's message and get response
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      data: text,
      language
    };

  } catch (error) {
    console.error('Error in plant chat:', error);
    return {
      success: false,
      error: error.message || 'Failed to get chat response',
      details: error
    };
  }
}

// Helper function to handle API rate limiting and retries
async function makeApiRequest(func, maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await func();
    } catch (error) {
      if (error.message.includes('Rate limit exceeded') && retries < maxRetries - 1) {
        retries++;
        await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
        continue;
      }
      throw error;
    }
  }
}