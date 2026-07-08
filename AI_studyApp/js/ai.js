const GEMINI_API_KEY = "AQ.Ab8RN6JG43cFXX27v5F6e-OQj0gQPRvuL6bdXEz5AVFos_9_fQ"; 

/**
 * Sends a message to the Gemini API and returns a step-by-step guided response.
 * @param {string} promptText - The question or homework problem from the student.
 * @returns {Promise<string>} - The AI's tutoring response.
 */
export async function getAlexResponse(promptText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    // Adding system instructions to force the AI into an interactive tutor persona
    systemInstruction: {
      parts: [
        {
          text: "You are Agent Alex, a friendly, encouraging personal assistant and study guider for students. Your core rule is: NEVER give the final answer straight away. Instead, break problems down step-by-step. Guide the student by explaining only the first small step, and then always end your response with a supportive question that pushes them to think and try solving that step themselves. Keep your tone cheerful, approachable, and highly interactive."
        }
      ]
    },
    contents: [
      {
        parts: [
          {
            text: promptText
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Google API error status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response structure from Gemini.");
    }

  } catch (error) {
    console.error("Gemini connection error:", error);
    return "Oops! I ran into an error connecting to my tutor brain. Can you try asking me your question again?";
  }
}