'use client';

import Button from '@/components/Button';
import Error from '@/components/Error';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { editPassword, resetEditPassword } from '@/lib/reducers/profile/reducer';
import { validationSchemeResetPassword } from '@/validation';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const RePassword = () => {
	const dispatch = useAppDispatch();
	const { replace } = useRouter();

	const { userID } = useAppSelector((state) => state.auth);
	const { isLoadingEditPassword, isErrorEditPassword, isSuccessEditPassword, messageEditPassword } = useAppSelector((state) => state.profile);

	useEffect(() => {
		if (isSuccessEditPassword) {
			dispatch(resetEditPassword());
			toast.success(messageEditPassword);
			replace('/profile');
		}

		if (isErrorEditPassword) {
			toast.error(messageEditPassword);
			dispatch(resetEditPassword());
		}
	}, [dispatch, userID, isSuccessEditPassword, isErrorEditPassword, messageEditPassword, replace]);

	const onSubmit = async (values) => {
		await dispatch(editPassword({ userID, ...values }));
	};

	return (
		<>
			<div className='lg:flex lg:space-x-4 px-4 lg:px-0 w-full'>
				<div className='flex flex-col space-y-2'>
					<div className='font-bold text-xl pt-4'>Şifreni yenile</div>
					<Formik
						validateOnBlur={false}
						validateOnChange={false}
						initialValues={{
							password: '',
							newPassword: '',
							newPasswordConfirm: ''
						}}
						validationSchema={validationSchemeResetPassword}
						onSubmit={(values) => {
							onSubmit(values);
						}}
					>
						{({ values, errors, handleChange, handleSubmit }) => (
							<form onSubmit={handleSubmit} className='flex flex-col lg:w-[32rem]'>
								<div className='flex flex-col space-y-2'>
									<div className='flex flex-col'>
										<Label label='Mevcut şifreniz' />
										<Input id='password' type='password' value={values.password} onChange={handleChange} />
										<Error error={errors.password} />
									</div>
									<div className='flex flex-col'>
										<Label label='Yeni şifreniz' />
										<Input id='newPassword' type='password' value={values.newPassword} onChange={handleChange} />
										<Error error={errors.newPassword} />
									</div>

									<div className='flex flex-col'>
										<Label label='Yeni şifrenizi tekrar girin' />
										<Input
											id='newPasswordConfirm'
											type='password'
											value={values.newPasswordConfirm}
											onChange={handleChange}
										/>
										<Error error={errors.newPasswordConfirm} />
									</div>
								</div>
								<div className='pt-4 flex flex-col'>
									<Button disabled={isLoadingEditPassword} type='submit'>
										Şifremi yenile
									</Button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default RePassword;
