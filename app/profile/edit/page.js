'use client';

import Button from '@/components/Button';
import Error from '@/components/Error';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { availableCountries, availableWords } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { editProfile, getProfile, resetEditProfile } from '@/lib/reducers/profile/reducer';
import { validationSchemaEditProfile } from '@/validation';
import { Formik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const EditProfile = () => {
	const dispatch = useAppDispatch();
	const { profile, isLoadingGetProfile, isLoadingEditProfile, isErrorEditProfile, isSuccessEditProfile, messageEditProfile } = useAppSelector((state) => state.profile);
	const { userID } = useAppSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getProfile({ userID }));
	}, [dispatch, userID]);

	const onSubmit = async (values) => {
		await dispatch(editProfile({ userID, profile: values }));
	};
	useEffect(() => {
		if (isSuccessEditProfile) {
			dispatch(resetEditProfile());
			toast.success(messageEditProfile);
		}

		if (isErrorEditProfile) {
			toast.error(messageEditProfile);
			dispatch(resetEditProfile());
		}
	});

	if (isLoadingGetProfile) {
		return <div className='text-xs text-red-800 pt-4'>Bilgiler yükleniyor...</div>;
	}

	return (
		<div className='lg:flex lg:space-x-4 px-4 lg:px-0 w-full'>
			<div className='flex flex-col space-y-2 pt-4'>
				<div className='flex flex-col lg:w-[32rem]'>
					<div className='font-bold text-xl'>Bilgilerini güncelle</div>
					<Formik
						validateOnBlur={false}
						validateOnChange={false}
						initialValues={{
							email: profile.user?.email || '',
							gender: profile.user?.gender || '',
							age: profile.user?.age || '',
							wordsIKnow: [],
							countriesILived: []
						}}
						validationSchema={validationSchemaEditProfile}
						onSubmit={async (values) => {
							await onSubmit(values);
						}}
					>
						{({ handleSubmit, handleChange, values, errors }) => (
							<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
								<Label label='E-Posta' />
								<Input placeholder='test@gmail.com' value={values.email} type='text' id='email' onChange={handleChange} />
								<Error error={errors.email} />

								<Label label='Cinsiyet' />
								<Input placeholder='Erkek-Kadın' onChange={handleChange} value={values.gender} type='text' id='gender' />
								<Error error={errors.gender} />

								<Label label='Yaş' />
								<Input placeholder='Yaşınız' value={values.age} type='number' id='age' onChange={handleChange} />
								<Error error={errors.age} />
								<Label label='Bulunduğum Ülkeler' />

								<MultiSelect
									id='countriesILived'
									value={values.countriesILived}
									onChange={handleChange}
									options={availableCountries}
									display='chip'
									placeholder='Bulunduğum Ülkeler'
									filter
								/>

								<Label label='Bildiğim Kelimeler' />
								<MultiSelect
									id='wordsIKnow'
									value={values.wordsIKnow}
									onChange={handleChange}
									options={availableWords}
									display='chip'
									placeholder='Bildiğim Kelimeler'
									filter
								/>

								<div className='pt-4 flex flex-col'>
									<Button disabled={isLoadingEditProfile} type='submit'>
										Güncelle
									</Button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
