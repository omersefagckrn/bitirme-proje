import Button from '@/components/Button';
import Error from '@/components/Error';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addQuiz, getAllQuiz, resetNewAddQuiz } from '@/lib/reducers/appQuiz/reducer';
import { validationSchemaCreateQuiz } from '@/validation';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { CiCirclePlus, CiCircleRemove } from 'react-icons/ci';
import { toast } from 'react-toastify';
import AllQuiz from './quizzes';

const CreateQuiz = () => {
	const dispatch = useAppDispatch();
	const { isLoadingAddQuiz, isErrorAddQuiz, isSuccessAddQuiz, messageAddQuiz } = useAppSelector((state) => state.appQuiz);

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		await dispatch(addQuiz({ title: values.title, questions: values.questions }));
		setSubmitting(false);
		resetForm();
	};

	useEffect(() => {
		if (isSuccessAddQuiz) {
			toast.success(messageAddQuiz);
			dispatch(getAllQuiz());
			dispatch(resetNewAddQuiz());
		}

		if (isErrorAddQuiz) {
			toast.error(messageAddQuiz);
			dispatch(resetNewAddQuiz());
		}
	}, [isSuccessAddQuiz, isErrorAddQuiz, messageAddQuiz, dispatch]);

	return (
		<>
			<Formik
				initialValues={{
					title: '',
					questions: [{ question: '', correctAnswer: '', options: ['', '', '', ''] }]
				}}
				validationSchema={validationSchemaCreateQuiz}
				validateOnBlur={true}
				validateOnChange={true}
				onSubmit={handleSubmit}
			>
				{({ values, isSubmitting, handleChange, errors, touched }) => (
					<Form className='flex flex-col space-y-4'>
						<div className='mt-2'>
							<h1 className='text-2xl font-bold'>Quiz Oluştur</h1>
						</div>
						<div className='flex flex-col space-y-2'>
							<Label label='Quiz Başlığı' />
							<Input
								name='title'
								type='text'
								placeholder='Başlık'
								value={values.title}
								onChange={handleChange}
								className={`w-full h-10 px-3 rounded-lg border ${touched.title && errors.title ? 'border-red-500' : 'border-black/30'}`}
							/>
							<ErrorMessage name='title' component={Error} />
						</div>
						<FieldArray name='questions'>
							{({ push, remove }) => (
								<>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
										{values.questions.map((question, index) => (
											<div key={index} className='relative p-4 border rounded-lg shadow-lg bg-white'>
												{values.questions.length > 1 && (
													<button
														type='button'
														onClick={() => remove(index)}
														className='absolute top-2 right-2 text-red-600'
													>
														<CiCircleRemove size={24} />
													</button>
												)}
												<div className='flex flex-col space-y-2'>
													<Label label={`Soru ${index + 1}`} />
													<Input
														className={`w-full h-10 px-3 rounded-lg border ${
															touched.questions?.[index]?.question &&
															errors.questions?.[index]?.question
																? 'border-red-500'
																: 'border-black/30'
														}`}
														name={`questions.${index}.question`}
														type='text'
														placeholder='Soru'
														value={question.question}
														onChange={handleChange}
													/>
													<ErrorMessage
														name={`questions.${index}.question`}
														component={Error}
													/>
												</div>
												<div className='flex flex-col space-y-2'>
													<Label label='Doğru Cevap' />
													<Input
														className={`w-full h-10 px-3 rounded-lg border ${
															touched.questions?.[index]?.correctAnswer &&
															errors.questions?.[index]?.correctAnswer
																? 'border-red-500'
																: 'border-black/30'
														}`}
														name={`questions.${index}.correctAnswer`}
														type='text'
														placeholder='Doğru Cevap'
														value={question.correctAnswer}
														onChange={handleChange}
													/>
													<ErrorMessage
														name={`questions.${index}.correctAnswer`}
														component={Error}
													/>
												</div>
												{question.options.map((option, optIndex) => (
													<div key={optIndex} className='flex flex-col space-y-2'>
														<Label label={`Seçenek ${optIndex + 1}`} />
														<Input
															className={`w-full h-10 px-3 rounded-lg border ${
																touched.questions?.[index]?.options?.[
																	optIndex
																] &&
																errors.questions?.[index]?.options?.[
																	optIndex
																]
																	? 'border-red-500'
																	: 'border-black/30'
															}`}
															name={`questions.${index}.options.${optIndex}`}
															type='text'
															placeholder={`Seçenek ${optIndex + 1}`}
															value={option}
															onChange={handleChange}
														/>
														<ErrorMessage
															name={`questions.${index}.options.${optIndex}`}
															component={Error}
														/>
													</div>
												))}
											</div>
										))}
									</div>
									<div className='flex justify-center mt-4'>
										<button
											type='button'
											onClick={() => push({ question: '', correctAnswer: '', options: ['', '', '', ''] })}
											className='text-blue-600 flex items-center'
										>
											<CiCirclePlus size={24} /> <span className='ml-2'>Soru Ekle</span>
										</button>
									</div>
								</>
							)}
						</FieldArray>
						<Button type='submit' disabled={isSubmitting || isLoadingAddQuiz}>
							Kaydet
						</Button>
					</Form>
				)}
			</Formik>
			<hr className='my-4 mx-6 border-[1px] border-primary rounded-full' />
			<AllQuiz />
		</>
	);
};

export default CreateQuiz;
