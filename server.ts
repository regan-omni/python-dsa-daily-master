import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// AI Tutor & Code Review Route
app.post('/api/gemini/tutor', async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. AI features are unavailable.',
      });
    }

    const { type, problemTitle, userCode, conceptName, userExplanation, level } = req.body;

    let systemInstruction =
      'You are PyAlgo Coach, an expert Python DSA and Competitive Programming mentor. Your goals are to build deep pattern recognition, teach idiomatic Python tricks (collections, heapq, bisect, itertools, slicing, bitwise hacks), and coach algorithmic complexity.';

    let prompt = '';

    if (type === 'code-review') {
      prompt = `Review this Python solution for the problem "${problemTitle}":
\`\`\`python
${userCode}
\`\`\`
Provide:
1. Correctness check (is it optimal?).
2. Time & Space Complexity analysis in Big O.
3. 2-3 Pythonic optimization tips or competitive programming shortcuts (e.g. using built-ins, list comprehensions, or fast patterns).
4. Encouraging constructive advice. Keep response concise, structured with Markdown and code snippets.`;
    } else if (type === 'socratic-hint') {
      prompt = `The user is stuck on the DSA problem "${problemTitle}". 
User's current code:
\`\`\`python
${userCode || '# No code written yet'}
\`\`\`
Give a 3-tier progressive hint:
- Level 1: Conceptual nudge (What pattern applies?)
- Level 2: Structural hint (How to organize data structures?)
- Level 3: Python-specific trick (Which Python function or idiom helps here?)
DO NOT give away the full final solution directly! Encourage them to try writing it.`;
    } else if (type === 'active-recall') {
      prompt = `The user completed or reviewed the concept "${conceptName}".
They provided this explanation of how it works in their own words:
"${userExplanation}"

Evaluate their active recall explanation:
1. Accuracy score out of 10.
2. What they explained correctly.
3. Key edge cases or nuances they missed.
4. One quick mental trick or visual memory hook to remember this concept forever.`;
    } else {
      prompt = `Explain the Python DSA concept "${conceptName}" for level "${level || 'Intermediate'}". Include 2 high-leverage Python competitive programming tricks for this topic with code snippets.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error('Error in /api/gemini/tutor:', err);
    res.status(500).json({ error: err.message || 'Internal AI Error' });
  }
});

// Custom AI Problem Generator Route
app.post('/api/gemini/custom-problem', async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const { topic, difficulty } = req.body;

    const prompt = `Generate a realistic Python Data Structure & Algorithm problem for topic "${topic}" with difficulty "${difficulty}".
Return strictly a valid JSON object matching this schema:
{
  "id": "custom-gen-1",
  "title": "Problem Title",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "description": "Clear problem statement with constraints",
  "examples": [
    { "input": "nums = [2, 7, 11, 15], target = 9", "output": "[0, 1]", "explanation": "2 + 7 = 9" }
  ],
  "starterCode": "def solve(nums, target):\n    # Your solution here\n    pass",
  "testCases": [
    { "input": "[2, 7, 11, 15], 9", "expected": "[0, 1]" },
    { "input": "[3, 2, 4], 6", "expected": "[1, 2]" }
  ],
  "pythonTips": ["Use a hash map dict for O(1) lookups.", "enumerate(nums) gives index and value together."],
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (err: any) {
    console.error('Error in /api/gemini/custom-problem:', err);
    res.status(500).json({ error: err.message || 'Failed to generate problem' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
