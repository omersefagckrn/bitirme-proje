import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || ''
});

export const runtime = 'edge';

async function createCompletionWithRetry(messages, retries = 3, delay = 1000) {
	try {
		return await openai.chat.completions.create({
			model: 'gpt-3.5-turbo-1106',
			messages: [
				{
					role: 'system',
					content: 'Bu bir dil öğrenme uygulamasıdır. Türkçe dilinde sorularınızı sorabilirsiniz. İnsanlara dil öğrenme uygulaması sunduğumuzdan dolayı lütfen saygılı ve olumlu cümleler kullanın ve onları eğitin.'
				},
				...messages
			],
			stream: true,
			temperature: 1
		});
	} catch (error) {
		if (error.response && error.response.status === 429 && retries > 0) {
			// Rate limit exceeded, wait and retry
			await new Promise((resolve) => setTimeout(resolve, delay));
			return createCompletionWithRetry(messages, retries - 1, delay * 2);
		} else {
			throw error;
		}
	}
}

export async function POST(req) {
	try {
		const { messages } = await req.json();
		const response = await createCompletionWithRetry(messages);
		const stream = OpenAIStream(response);
		return new StreamingTextResponse(stream);
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
