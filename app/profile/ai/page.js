'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const AIPage = () => {
	const chatContainer = useRef(null);
	const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
		api: '/api/ai'
	});

	const scroll = () => {
		const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
		if (scrollHeight >= scrollTop + offsetHeight) {
			chatContainer.current?.scrollTo(0, scrollHeight + 200);
		}
	};

	useEffect(() => {
		scroll();
	}, [messages]);

	const renderMessageContent = (content) => {
		const codeBlockPattern = /```([\s\S]*?)```/g;
		const parts = content.split(codeBlockPattern);

		return parts.map((part, index) => {
			if (index % 2 === 1) {
				return (
					<pre key={index} className='bg-gray-800 text-white p-2 rounded-md my-2 overflow-auto'>
						<code>{part}</code>
					</pre>
				);
			}
			return <p key={index}>{part}</p>;
		});
	};

	const renderResponse = () => {
		if (messages.length === 0) {
			return (
				<div className='flex justify-center items-center h-full'>
					<div className='text-gray-500 italic'>Henüz soru sormadın heyecanla bekliyorum! 🚀</div>
				</div>
			);
		}

		return (
			<div className='space-y-4'>
				{messages.map((m, index) => (
					<div key={m?.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
						<div
							className={`p-2 rounded-lg italic font-semibold text-[15px] ${
								m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-black'
							}`}
						>
							{renderMessageContent(m?.content)}
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className='bg-gray-100 flex flex-col items-center p-4'>
			<div ref={chatContainer} className='w-full max-w-5xl bg-white rounded-lg shadow-lg p-4 overflow-y-auto' style={{ maxHeight: '70vh' }}>
				{renderResponse()}
				{isLoading && (
					<div className='flex justify-center items-center mt-2'>
						<div className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-gray-500 rounded-full'></div>
					</div>
				)}
				{error && <div className='text-red-500 text-center mt-2'>{error?.message?.toString()}</div>}
			</div>
			<form onSubmit={handleSubmit} className='w-full max-w-2xl flex mt-4 relative'>
				<input
					type='text'
					placeholder='Bir şeyler sor...'
					value={input}
					onChange={handleInputChange}
					className='flex-grow p-4 rounded-full outline-none foucs:outline-none'
					required
				/>
				<button type='submit' className='bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 flex items-center justify-center absolute right-1 top-1'>
					<FaArrowCircleUp size={24} />
				</button>
			</form>
		</div>
	);
};

export default AIPage;
