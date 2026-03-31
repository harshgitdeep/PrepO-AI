const axios = require("axios");

const callGemini = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    return "Error calling Gemini API";
  }
};

const generateRoadmapPrompt = (role, experience) => {
  return `
Act as a senior software engineer and interview coach.

Create a 4-week interview preparation roadmap for a ${role} with ${experience} experience.

Include:
- DSA
- System Design
- DBMS
- OOPs
- OS
- Computer Networks

Return in this format:

Week 1:
- Topic
- Topic

Week 2:
- Topic

Week 3:
- Topic

Week 4:
- Topic
`;
};

const generateQuestionsPrompt = (role, experience) => {
  return `
Act as a technical interviewer.

Generate 5 interview questions for a ${role} with ${experience} experience.

Include:
- 2 DSA
- 1 DBMS
- 1 OOPs
- 1 System Design

Return in JSON format like:

[
  {
    "question": "",
    "answer": "",
    "topic": "",
    "difficulty": ""
  }
]
`;
};

module.exports = {
  callGemini,
  generateRoadmapPrompt,
  generateQuestionsPrompt,
};
