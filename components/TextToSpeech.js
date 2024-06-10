'use client';

const TextToSpeech = ({ text }) => {
	const speakText = () => {
		let utterance = new SpeechSynthesisUtterance();
		utterance.text = text;
		speechSynthesis.speak(utterance);
	};

	return (
		<span onClick={speakText} className='cursor-pointer space-x-1'>
			<span>{text}</span>
			<span>🔊</span>
		</span>
	);
};

export default TextToSpeech;
