'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllQuiz, resetSubmitQuiz, submitQuiz } from '@/lib/reducers/appQuiz/reducer';
import { getProfile } from '@/lib/reducers/profile/reducer';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Quiz = () => {
	const dispatch = useAppDispatch();
	const { profile, isLoadingGetProfile } = useAppSelector((state) => state.profile);
	const { allQuizzes, isLoadingGetAllQuiz, isSuccessSubmitQuiz, isErrorSubmitQuiz, messageSubmitQuiz } = useAppSelector((state) => state.appQuiz);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState({});

	useEffect(() => {
		dispatch(getProfile());
		dispatch(getAllQuiz());
	}, [dispatch]);

	useEffect(() => {
		if (isSuccessSubmitQuiz) {
			toast.success(messageSubmitQuiz);
			window.location.reload();
			dispatch(resetSubmitQuiz());
		}
		if (isErrorSubmitQuiz) {
			toast.error(messageSubmitQuiz);
			dispatch(resetSubmitQuiz());
		}
	}, [isSuccessSubmitQuiz, isErrorSubmitQuiz, messageSubmitQuiz, dispatch]);

	const handleAnswerChange = (quizId, questionIndex, answer) => {
		const newSelectedAnswers = { ...selectedAnswers };
		if (!newSelectedAnswers[quizId]) {
			newSelectedAnswers[quizId] = [];
		}
		newSelectedAnswers[quizId][questionIndex] = answer;
		setSelectedAnswers(newSelectedAnswers);
	};

	const handleNextQuestion = (quizId, quizTitle) => {
		const currentQuestionIdx = currentQuestionIndex[quizId] || 0;
		const completedQuiz = allQuizzes.find((quiz) => quiz._id === quizId && quiz.completedStudents.some((student) => student.userId.toString() === profile?.user?._id.toString()));

		if ((selectedAnswers[quizId] && selectedAnswers[quizId][currentQuestionIdx] !== undefined) || completedQuiz) {
			setCurrentQuestionIndex((prevState) => ({
				...prevState,
				[quizId]: (prevState[quizId] || 0) + 1
			}));
		} else {
			toast.warning(`Lütfen "${quizTitle}" quizindeki Soru ${currentQuestionIdx + 1} için bir cevap seçin.`);
		}
	};

	const handlePreviousQuestion = (quizId) => {
		setCurrentQuestionIndex((prevState) => ({
			...prevState,
			[quizId]: (prevState[quizId] || 1) - 1
		}));
	};

	const handleSubmitQuiz = async (quizId) => {
		const quiz = allQuizzes.find((q) => q._id === quizId);
		const answers = quiz.quiz.map((question, index) => ({
			questionIndex: index,
			selectedAnswer: selectedAnswers[quizId]?.[index] || '',
			correctAnswer: question.correctAnswer,
			isCorrect: selectedAnswers[quizId]?.[index] === question.correctAnswer
		}));
		await dispatch(submitQuiz({ userId: profile.user._id, quizId, answers }));
	};

	if (isLoadingGetProfile || isLoadingGetAllQuiz) {
		return <div>Yükleniyor...</div>;
	}

	const completedQuizzes = allQuizzes.filter((quiz) => quiz.completedStudents.some((student) => student.userId.toString() === profile?.user?._id?.toString()));

	const activeQuizzes = allQuizzes.filter((quiz) => !quiz.completedStudents.some((student) => student.userId.toString() === profile?.user?._id?.toString()) && quiz.published);

	return (
		<div className='container mx-auto p-6'>
			<h2 className='text-3xl font-bold mb-6 text-red-500'>Aktif Quizler</h2>
			{activeQuizzes.length > 0 ? (
				activeQuizzes.map((quiz) => {
					const currentQuestionIdx = currentQuestionIndex[quiz._id] || 0;
					const currentQuestion = quiz.quiz[currentQuestionIdx];
					const isQuizCompleted = quiz.completedStudents.some((student) => student?.userId?.toString() === profile?.user?._id?.toString());
					const areAllQuestionsAnswered =
						selectedAnswers[quiz._id]?.length === quiz.quiz.length &&
						selectedAnswers[quiz._id].every((answer) => answer !== undefined && answer !== null);

					return (
						<div key={quiz._id} className='mb-8 p-6 border rounded-lg shadow-lg bg-white'>
							<h3 className='text-2xl font-semibold mb-4'>{quiz.title}</h3>
							{isQuizCompleted && <div className='text-green-600 font-bold'>Bu quizi tamamladınız!</div>}
							<div className='mb-4'>
								<p className='font-bold my-2'>
									Soru {currentQuestionIdx + 1}/{quiz.quiz.length}: {currentQuestion.question}
								</p>
								<div className='flex flex-col space-y-2'>
									{currentQuestion.options.map((option, index) => (
										<button
											key={index}
											onClick={() => handleAnswerChange(quiz._id, currentQuestionIdx, option)}
											className={`py-2 px-4 rounded-lg font-bold transition-colors duration-200 ${
												selectedAnswers[quiz._id]?.[currentQuestionIdx] === option
													? 'bg-blue-600 text-white'
													: 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
											}`}
											disabled={isQuizCompleted}
										>
											{option}
										</button>
									))}
								</div>
							</div>
							<div className='flex justify-between mt-3'>
								{currentQuestionIdx > 0 && (
									<button
										onClick={() => handlePreviousQuestion(quiz._id)}
										className='bg-red-600 text-white font-bold py-2 px-4 rounded-lg select-none transition-colors duration-200 hover:bg-red-700'
									>
										Geri
									</button>
								)}
								{currentQuestionIdx < quiz.quiz.length - 1 && (
									<button
										onClick={() => handleNextQuestion(quiz._id, quiz.title)}
										className='bg-blue-600 text-white font-bold py-2 px-4 rounded-lg select-none transition-colors duration-200 hover:bg-blue-700'
									>
										İleri
									</button>
								)}
							</div>
							{currentQuestionIdx === quiz.quiz.length - 1 && !isQuizCompleted && (
								<button
									onClick={() => handleSubmitQuiz(quiz._id)}
									className={`w-full font-bold py-3 px-4 rounded-lg mt-6 transition-colors duration-200 ${
										areAllQuestionsAnswered
											? 'bg-green-600 hover:bg-green-700 text-white'
											: 'bg-gray-400 text-gray-800 cursor-not-allowed'
									}`}
									disabled={!areAllQuestionsAnswered}
								>
									Tamamla
								</button>
							)}
						</div>
					);
				})
			) : (
				<div className='my-2 font-semibold'>Aktif quiz bulunmamaktadır.</div>
			)}

			<h2 className='text-3xl font-bold mb-6 text-primary'>Çözdüğünüz Quizler</h2>
			{completedQuizzes.length > 0 ? (
				completedQuizzes.map((quiz) => {
					const student = quiz.completedStudents.find((student) => student?.userId?.toString() === profile?.user._id?.toString());
					const currentQuestionIdx = currentQuestionIndex[quiz._id] || 0;
					const currentQuestion = quiz.quiz[currentQuestionIdx];
					const answer = student.answers[currentQuestionIdx];
					return (
						<div key={quiz._id} className='mb-8 p-6 border rounded-lg shadow-lg bg-white'>
							<h3 className='text-2xl font-semibold mb-4'>{quiz.title}</h3>
							<p className='font-semibold'>Doğru Cevap Sayınız: {student.answers.filter((answer) => answer.isCorrect).length}</p>
							<p className='font-semibold'>Yanlış Cevap Sayınız: {student.answers.filter((answer) => !answer.isCorrect).length}</p>
							<div className='mb-4'>
								<div className={`p-4 rounded-lg ${answer.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
									<p className='font-bold'>
										Soru {answer.questionIndex + 1} / {quiz.quiz.length}: {currentQuestion.question}
									</p>
									<p>Seçtiğiniz Cevap: {answer.selectedAnswer}</p>
									<p>Doğru Cevap: {answer.correctAnswer}</p>
								</div>
							</div>
							<div className='flex justify-between mt-3'>
								{currentQuestionIdx > 0 && (
									<button
										onClick={() => handlePreviousQuestion(quiz._id)}
										className='bg-red-600 text-white font-bold py-2 px-4 rounded-lg select-none transition-colors duration-200 hover:bg-red-700'
									>
										Geri
									</button>
								)}
								{currentQuestionIdx < quiz.quiz.length - 1 && (
									<button
										onClick={() => handleNextQuestion(quiz._id)}
										className='bg-blue-600 text-white font-bold py-2 px-4 rounded-lg select-none transition-colors duration-200 hover:bg-blue-700'
									>
										İleri
									</button>
								)}
							</div>
						</div>
					);
				})
			) : (
				<div className='my-2 font-semibold'>Herhangi bir quiz çözmediniz.</div>
			)}
		</div>
	);
};

export default Quiz;
