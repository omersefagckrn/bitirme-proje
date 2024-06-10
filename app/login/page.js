'use client';

import Button from '@/components/Button';
import Error from '@/components/Error';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login, reset, setSession, setUserID } from '@/lib/reducers/auth/reducer';
import { validationSchemaLogin } from '@/validation';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
	const { push, replace } = useRouter();
	const dispatch = useAppDispatch();
	const { session, isErrorLogin, isSuccessLogin, isLoadingLogin, messageLogin } = useAppSelector((state) => state.auth);

	const onSubmit = async ({ email, password }) => {
		await dispatch(
			login({
				email,
				password
			})
		);
		dispatch(setSession(JSON.parse(localStorage.getItem('user'))));
		dispatch(setUserID(JSON.parse(localStorage.getItem('userID'))));
	};

	useEffect(() => {
		if (isSuccessLogin) {
			toast.success(messageLogin);
			dispatch(reset());
			replace('/');
		}

		if (isErrorLogin) {
			toast.error(messageLogin);
			dispatch(reset());
		}

		if (session) {
			replace('/');
		}
	}, [isSuccessLogin, isErrorLogin, push, dispatch, messageLogin, replace, session]);

	return (
		<div className='lg:mx-auto lg:max-w-[1100px] px-4 lg:px-0 w-full'>
			<div className='flex flex-col items-center justify-center space-y-2 pt-16'>
				<div className='font-bold text-xl'>Aramıza Hoş geldin!</div>
				<div className='flex flex-col lg:w-[32rem]'>
					<Formik
						validateOnBlur={false}
						validateOnChange={false}
						initialValues={{ email: 'omergckrnx@gmail.com', password: 'omersefa' }}
						validationSchema={validationSchemaLogin}
						onSubmit={async (values) => {
							await onSubmit(values);
						}}
					>
						{({ handleSubmit, handleChange, values, errors }) => (
							<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
								<Label label='E-Posta' />
								<Input placeholder='E-Posta' value={values.email} type='text' id='email' onChange={handleChange} />
								<Error error={errors.email} />

								<Label label='Şifre' />
								<Input placeholder='Şifre' value={values.password} type='password' id='password' onChange={handleChange} />
								<Error error={errors.password} />

								<div className='pt-4 flex flex-col'>
									<Button onClick={handleSubmit} disabled={isLoadingLogin} type='submit'>
										Oturum Aç
									</Button>
								</div>
								<div className='flex flex-col lg:flex-row items-center justify-center text-center space-x-1 font-semibold pt-6'>
									<div>Eğer hesabın yoksa buradan</div>
									<div className='underline font-bold text-red-800 cursor-pointer' onClick={() => push('/register')}>
										kayıt olabilirsin.
									</div>
								</div>
								<div className='flex flex-col lg:mx-auto items-center justify-center w-full lg:max-w-[350px] space-y-2'>
									<div className='text-center font-medium text-xs text-gray-500'>
										Çabuk Öğren de oturum açarak, <span className='font-bold'>kelimeleri</span> ve{' '}
										<span className='font-bold'>ülkeleri</span> öğrenmeye başla!
									</div>
									<div className='text-center font-medium text-xs text-gray-500'>
										Eğer onaylarsan Koşullarımızı ve <span className='font-bold'>Gizlilik Politikamızı</span> kabul
										etmiş olursun.
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
