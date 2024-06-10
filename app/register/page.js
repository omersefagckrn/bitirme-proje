'use client';

import Button from '@/components/Button';
import Error from '@/components/Error';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { availableCountries, availableWords } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { register, reset } from '@/lib/reducers/auth/reducer';
import { validationSchemaRegister } from '@/validation';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
	const { push, replace } = useRouter();
	const dispatch = useAppDispatch();
	const { isSuccessRegister, isLoadingRegister, isErrorRegister, messageRegister } = useAppSelector((state) => state.auth);
	const { session } = useAppSelector((state) => state.auth);

	const onSubmit = async (values) => {
		if (values.wordsIKnow.length === 0) {
			toast.error('Bildiğiniz kelimeleri seçmelisiniz.');
			return;
		}

		if (values.countriesILived.length === 0) {
			toast.error('Yaşadığınız ülkeleri seçmelisiniz.');
			return;
		}
		await dispatch(register(values));
	};

	useEffect(() => {
		if (isSuccessRegister) {
			dispatch(reset());
			toast.success(messageRegister);
			replace('/login');
		}

		if (isErrorRegister) {
			toast.error(messageRegister);
			dispatch(reset());
		}
	}, [push, dispatch, replace, session, isSuccessRegister, isErrorRegister, messageRegister]);

	return (
		<div className='lg:mx-auto lg:max-w-[1100px] px-4 lg:px-0 w-full'>
			<div className='flex flex-col items-center justify-center space-y-2 pt-16'>
				<div className='font-bold text-xl'>Buradan kayıt oluşturabilirsin!</div>
				<div className='flex flex-col lg:w-[32rem]'>
					<Formik
						validateOnBlur={false}
						validateOnChange={false}
						initialValues={{
							email: '',
							password: '',
							gender: '',
							age: '',
							wordsIKnow: [],
							countriesILived: []
						}}
						validationSchema={validationSchemaRegister}
						onSubmit={async (values) => {
							await onSubmit(values);
						}}
					>
						{({ handleSubmit, handleChange, values, errors }) => (
							<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
								<Label label='E-Posta' />
								<Input placeholder='E-posta' value={values.email} type='text' id='email' onChange={handleChange} />
								<Error error={errors.email} />

								<Label label='Parola' />
								<Input placeholder='Parola' value={values.password} type='password' id='password' onChange={handleChange} />
								<Error error={errors.password} />

								<Label label='Cinsiyet' />
								<Input placeholder='Erkek-Kadın' onChange={handleChange} value={values.gender} type='text' id='gender' />
								<Error error={errors.gender} />

								<Label label='Yaş' />
								<Input placeholder='Yaşınız' value={values.age} type='number' id='age' onChange={handleChange} />
								<Error error={errors.age} />

								<Label label='Bulunduğum Ülkeler' />
								<MultiSelect
									filter
									id='countriesILived'
									value={values.countriesILived}
									onChange={handleChange}
									options={availableCountries}
									display='chip'
									placeholder='Bulunduğum Ülkeler'
								/>

								<Label label='Bildiğim Kelimeler' />
								<MultiSelect
									filter
									id='wordsIKnow'
									value={values.wordsIKnow}
									onChange={handleChange}
									options={availableWords}
									display='chip'
									placeholder='Bildiğim Kelimeler'
								/>

								<div className='pt-4 flex flex-col'>
									<Button disabled={isLoadingRegister} type='submit'>
										Kayıt Ol
									</Button>
								</div>
								<div className='flex items-center justify-center w-full pt-6'>
									<div className='flex items-center space-x-1 font-semibold'>
										<div>Eğer hesabın varsa buradan</div>
										<div className='underline font-bold text-red-800' onClick={() => push('/login')}>
											giriş
										</div>
										<div>yapabilirsin.</div>
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Register;
