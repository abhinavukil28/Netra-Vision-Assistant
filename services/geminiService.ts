
const PROMPT = `You are an expert at describing scenes for visually impaired users. In a clear and concise manner, describe the main subject and any important objects or potential hazards in this image. Speak in the present tense, as if you are their eyes. For example, instead of 'A man was walking a dog', say 'A man is walking a dog'. Start your description directly, without any preamble like 'This image shows...' or 'In this image,'. Be direct and informative.`;

export const describeImage = async (base64Image: string): Promise<string> => {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const body = {
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: PROMPT,
          },
        ],
      },
    ],
  };

  // Use deployed backend URL or fallback to localhost for development
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://netra-vision-assistant-production.up.railway.app";
  const response = await fetch(`${API_BASE_URL}/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Failed to get description from AI");
  }

  const data = await response.json();
  // Gemini's response structure: candidates[0].content.parts[0].text
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("The AI returned an empty description.");
  return text.trim();
};

