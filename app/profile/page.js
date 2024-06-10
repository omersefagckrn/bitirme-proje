'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getProfile } from '@/lib/reducers/profile/reducer';
import { useEffect } from 'react';

const Profile = () => {
	const dispatch = useAppDispatch();
	const { profile, isLoadingGetProfile } = useAppSelector((state) => state.profile);
	const { userID } = useAppSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getProfile({ userID }));
	}, [dispatch, userID]);

	if (isLoadingGetProfile) {
		<div className='text-xs text-red-800 pt-4'>Bilgiler yükleniyor...</div>;
	}

	return (
		<>
			{profile && profile?.user && (
				<div className='flex flex-col lg:flex-row space-x-2 space-y-2 lg:space-y-0 pt-4 text-center'>
					<div>
						<div className='font-semibold text-black text-sm text-left'>Kendi Bilgilerim</div>
						<div className='px-1 py-2 my-2 border border-primary rounded-lg hover:bg-blue-400 hover:text-white transition-colors w-[20rem]'>
							<div>{profile?.user?.email}</div>
						</div>
						<div className='px-1 py-2 my-2 border border-primary rounded-lg hover:bg-blue-400 hover:text-white transition-colors w-[20rem]'>
							<div>{profile?.user?.gender}</div>
						</div>
						<div className='px-1 py-2 my-2 border border-primary rounded-lg hover:bg-blue-400 hover:text-white transition-colors w-[20rem]'>
							<div>{profile?.user?.age}</div>
						</div>
					</div>

					<div className='flex flex-col'>
						<div className='font-semibold text-black text-sm text-left'>Bulunduğum Ülkeler</div>
						{profile?.user?.countriesILived?.map((item, idx) => (
							<div
								className='px-1 py-2 my-[5px] border border-primary rounded-lg hover:bg-blue-400 hover:text-white transition-colors w-[20rem]'
								key={idx}
							>
								{item}
							</div>
						))}
					</div>

					<div className='flex flex-col'>
						<div className='font-semibold text-black text-sm text-left'>Bildiğim Kelimeler</div>
						{profile?.user?.wordsIKnow?.map((item, idx) => (
							<div
								className='px-1 py-2 my-[5px] border border-primary rounded-lg hover:bg-blue-400 hover:text-white transition-colors w-[20rem]'
								key={idx}
							>
								{item}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
