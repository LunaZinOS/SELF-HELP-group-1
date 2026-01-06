// Gemini API Service
// This service handles all communication with Google's Gemini API

const GEMINI_API_KEY = 'AIzaSyBxJBvAD_iR_2xYTxVszd7wh_o79NT-fzc';
// Using fallback responses due to API model compatibility issues
const USE_FALLBACK = false;

/**
 * Send a message to Gemini API and get a response
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The API response
 */
export const sendMessageToGemini = async (userMessage) => {
  try {
    // For now, using reliable fallback responses
    if (USE_FALLBACK) {
      return getDefaultResponse(userMessage);
    }

    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent';
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are a helpful guide for the National Self Help Group (SHG) Digital Platform. You help users understand what Self Help Groups are, how the platform works, and provide guidance on SHG management in simple, non-technical language. Always be friendly and use real-world examples relevant to rural communities and SHGs in India.

User Question: ${userMessage}

Please provide a clear, concise response in 2-3 sentences that directly answers the question.`,
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
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || 'Failed to get response from Gemini API'
      );
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No response generated from Gemini API');
    }

    return generatedText;
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Return fallback response on error
    return getDefaultResponse(userMessage);
  }
};

/**
 * Provide default responses when API is unavailable
 */
const getDefaultResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  const responses = {
    'self help': 'Self Help Groups (SHGs) are small groups of 10-20 members, typically women, who come together to achieve common socio-economic goals. They focus on savings, credit, skill development, and community welfare through mutual support.',
    'group': 'SHGs are informal associations where members band together to pursue joint economic activities. They operate on principles of mutual aid, shared responsibility, and collective decision-making for sustainable development.',
    'loan': 'SHGs provide microfinance to members through group savings. Members contribute regularly to a common fund, which is then lent to members at reasonable interest rates, promoting financial inclusion.',
    'member': 'SHG members are typically women from rural communities who come together voluntarily. Members contribute to the group fund, participate in decision-making, and support each other\'s economic growth.',
    'dashboard': 'The SHG Dashboard on our platform helps you track member details, view group activities, monitor loan disbursement, and celebrate group milestones all in one place.',
    'announcement': 'Stay informed with our Announcements feature. Receive official updates from district, state, and national levels about policies, programs, and opportunities relevant to SHGs.',
    'resource': 'Our Resources section provides training materials, success stories, and best practices from established SHGs. Learn from others and improve your group\'s operations and efficiency.',
    'train': 'We offer training materials and skill development resources covering topics like financial management, business planning, and leadership for SHG members.',
    'help': 'I\'m here to help you understand Self Help Groups, navigate the platform, and provide guidance on SHG management. Ask me anything about SHGs, loans, members, or platform features!',
    'platform': 'This SHG Digital Platform connects Self Help Groups across India, providing tools for group management, communication, training, and access to microfinance opportunities.',
    'feature': 'Key platform features include: SHG Dashboard, Announcements, Learning Resources, AI-powered Guide, National Overview, and Admin tools for effective group management.',
  };

  // Check for keyword matches
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  // Default helpful response
  return 'Great question! I can help you with information about Self Help Groups, how the platform works, SHG management, loans, member training, and more. What specific topic interests you?';
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
