'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getProfile } from '@/lib/reducers/profile/reducer';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProfileLayout = ({ children }) => {
	const { push } = useRouter();
	const location = usePathname();

	const dispatch = useAppDispatch();
	const { profile, isLoadingGetProfile } = useAppSelector((state) => state.profile);
	const { userID } = useAppSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getProfile({ userID }));
	}, [dispatch, userID]);

	const route = [
		{
			name: 'Kişisel Bilgilerim',
			path: '/profile'
		},
		{
			name: 'Bilgilerimi Düzenle',
			path: '/profile/edit'
		},
		{
			name: 'Şifreni Yenile',
			path: '/profile/repassword'
		},
		{
			name: 'Kelime Havuzu',
			path: '/profile/word'
		},
		{
			name: 'Senin Yapay Zekan',
			path: '/profile/ai'
		},
		{
			name: 'Quiz',
			path: '/profile/quiz'
		}
	];

	return (
		<div className='mx-auto w-full lg:max-w-[988px] px-3 lg:px-0 py-10'>
			<div className='flex items-center space-x-3 w-full overflow-x-auto select-none'>
				{route.map((item, index) => (
					<div
						key={index}
						onClick={() => push(item.path)}
						className={`cursor-pointer font-medium text-[14px] whitespace-nowrap ${
							location === item.path ? 'text-primary border-b-[2px] border-primary' : 'text-black'
						}`}
					>
						{item.name}
					</div>
				))}

				{profile && profile?.user && profile?.user?.isAdmin && !isLoadingGetProfile ? (
					<div
						onClick={() => push('/profile/panel')}
						className={`cursor-pointer font-medium text-[14px] whitespace-nowrap ${
							location === '/profile/panel' ? 'text-primary border-b-[2px] border-primary' : 'text-black'
						}`}
					>
						Yönetim Paneli
					</div>
				) : null}
			</div>
			{children}
		</div>
	);
};

export default ProfileLayout;
