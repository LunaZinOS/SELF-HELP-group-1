// Gemini API Service
// This service handles all communication with Gemini API directly

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

/**
 * Send a message to Gemini API and get a response
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The API response
 */
export const sendMessageToGemini = async (userMessage) => {
  // Use direct Gemini API call
  if (GEMINI_API_KEY) {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  throw new Error('API key not configured');
};

/**
 * Get an explanation about the SHG Platform
 * @returns {Promise<string>} - Platform overview
 */
export const getPlatformOverview = async () => {
  const prompt =
    'Briefly explain what the National Self Help Group Digital Platform is and its main benefits in 2-3 sentences.';
  return sendMessageToGemini(prompt);
};

/**
 * Get guidance on SHG management
 * @param {string} topic - The topic to get guidance on
 * @returns {Promise<string>} - Guidance response
 */
export const getSHGGuidance = async (topic) => {
  const prompt = `Provide practical guidance on "${topic}" for Self Help Group (SHG) leaders. Keep it simple and practical.`;
  return sendMessageToGemini(prompt);
};
