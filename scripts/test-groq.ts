import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const key = process.env.GROQ_API_KEY || '';
const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

console.log('Testing Groq connection...');
console.log('Key length:', key.length);
console.log('Key start:', key.slice(0, 10));
console.log('Model:', model);

async function runTest() {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: 'Hello! Please respond with a single word "SUCCESS" if you can read this.' },
        ],
        max_tokens: 10,
        temperature: 0.1,
      }),
    });

    console.log('Response status:', response.status, response.statusText);
    const text = await response.text();
    console.log('Response body:', text);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

runTest();
