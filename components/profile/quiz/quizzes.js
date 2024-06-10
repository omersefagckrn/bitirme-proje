import Button from '@/components/Button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { deleteQuiz, getAllQuiz, publishQuiz, resetNewDeleteQuiz, resetNewPublishQuiz } from '@/lib/reducers/appQuiz/reducer';
import { useEffect, useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { toast } from 'react-toastify';

const AllQuiz = () => {
	const {
		allQuizzes,
		isLoadingGetAllQuiz,
		isErrorGetAllQuiz,

		isErrorPublishQuiz,
		isSuccessPublishQuiz,
		messagePublishQuiz,

		isErrorDeleteQuiz,
		isSuccessDeleteQuiz,
		messageDeleteQuiz
	} = useAppSelector((state) => state.appQuiz);
	const dispatch = useAppDispatch();
	const [loadingQuizIds, setLoadingQuizIds] = useState([]);
	const [deletingQuizIds, setDeletingQuizIds] = useState([]);

	useEffect(() => {
		dispatch(getAllQuiz());
	}, [dispatch]);

	useEffect(() => {
		if (isSuccessPublishQuiz) {
			toast.success(messagePublishQuiz);
			dispatch(getAllQuiz());
			dispatch(resetNewPublishQuiz());
		}

		if (isErrorPublishQuiz) {
			toast.error(messagePublishQuiz);
			dispatch(resetNewPublishQuiz());
		}
	}, [isSuccessPublishQuiz, isErrorPublishQuiz, messagePublishQuiz, dispatch]);

	useEffect(() => {
		if (isSuccessDeleteQuiz) {
			toast.success(messageDeleteQuiz);
			dispatch(getAllQuiz());
			dispatch(resetNewDeleteQuiz());
		}

		if (isErrorDeleteQuiz) {
			toast.error(messageDeleteQuiz);
			dispatch(resetNewDeleteQuiz());
		}
	}, [isSuccessDeleteQuiz, isErrorDeleteQuiz, messageDeleteQuiz, dispatch]);

	if (isLoadingGetAllQuiz) {
		return <div className='text-center text-xl text-gray-600'>Tüm quizler yükleniyor...</div>;
	}

	if (isErrorGetAllQuiz) {
		return <div className='text-center text-xl text-red-600'>Tüm quizler yüklenirken bir hata oluştu!</div>;
	}

	const handleDeleteQuiz = async (quizId) => {
		setDeletingQuizIds((prev) => [...prev, quizId]);
		await dispatch(deleteQuiz({ quizId }));
		setDeletingQuizIds((prev) => prev.filter((id) => id !== quizId));
	};

	const handlePublishQuiz = async (quizId) => {
		setLoadingQuizIds((prev) => [...prev, quizId]);
		await dispatch(publishQuiz({ quizId }));
		setLoadingQuizIds((prev) => prev.filter((id) => id !== quizId));
	};

	return (
		<>
			<div className='container mx-auto p-6'>
				<h2 className='text-3xl font-bold mb-6 text-gray-800'>Tüm Quizler</h2>
				<div className='grid gap-6'>
					{allQuizzes.map((quiz) => (
						<div key={quiz._id} className='relative p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300'>
							{!quiz.published && (
								<button
									type='button'
									onClick={() => handleDeleteQuiz(quiz._id)}
									disabled={deletingQuizIds.includes(quiz._id)}
									className='absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors duration-200'
								>
									<CiCircleRemove size={24} />
								</button>
							)}
							<h3 className='text-2xl font-semibold mb-2 text-gray-700'>
								{quiz.title} <span className='text-lg text-gray-500'>({quiz.quiz.length} soru)</span>
							</h3>
							<p className='text-sm mb-2 text-gray-500'>Oluşturulma Tarihi: {new Date(quiz.createdAt).toLocaleDateString()}</p>
							<div
								className={`px-3 py-1 rounded text-center font-bold ${
									quiz.published ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
								}`}
							>
								{quiz.published ? 'Yayında' : 'Yayında Değil'}
							</div>
							<div className='max-h-80 overflow-y-auto mt-4'>
								<ul className='list-disc pl-4'>
									{quiz.quiz.map((q, idx) => (
										<li key={idx} className='mb-2'>
											<p className='font-bold text-gray-700'>{q.question}</p>
											<ul className='list-disc pl-4 text-gray-600'>
												{q.options.map((option, optIdx) => (
													<li key={optIdx}>{option}</li>
												))}
											</ul>
											<p className='text-green-600'>Doğru Cevap: {q.correctAnswer}</p>
										</li>
									))}
								</ul>
							</div>
							<div className='mt-4'>
								<h4 className='font-semibold text-gray-700'>Tamamlayan Öğrenciler:</h4>
								{quiz.completedStudents?.length > 0 ? (
									<ul className='list-disc pl-4'>
										{quiz.completedStudents.map((student, idx) => (
											<li key={idx} className='mb-4'>
												<p className='text-gray-800'>{student.email}</p>
												<p className='text-green-600'>
													Doğru Cevaplar:{' '}
													{student.answers.filter((answer) => answer.isCorrect).length}
												</p>
												<p className='text-red-600'>
													Yanlış Cevaplar:{' '}
													{student.answers.filter((answer) => !answer.isCorrect).length}
												</p>
												<ul className='list-disc pl-4 mt-2'>
													{student.answers.map((answer, aIdx) => (
														<li
															key={aIdx}
															className={`mb-2 p-2 rounded-lg ${
																answer.isCorrect
																	? 'bg-green-100 text-green-800'
																	: 'bg-red-100 text-red-800'
															}`}
														>
															Soru {answer.questionIndex + 1}:{' '}
															{quiz.quiz[answer.questionIndex].question}
															<p>Seçtiği Cevap: {answer.selectedAnswer}</p>
															<p>Doğru Cevap: {answer.correctAnswer}</p>
														</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								) : (
									<p className='text-gray-500'>Tamamlayan öğrenci bulunmamaktadır.</p>
								)}
							</div>
							<div className='mt-4'>
								<Button className='w-full' disabled={loadingQuizIds.includes(quiz._id)} onClick={() => handlePublishQuiz(quiz._id)}>
									{quiz.published ? 'Yayından Kaldır' : 'Yayınla'}
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default AllQuiz;
