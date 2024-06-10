'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout, setSession, setUserID } from '@/lib/reducers/auth/reducer';
import { reset } from '@/lib/reducers/profile/reducer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { toast } from 'react-toastify';
import Logo from './Logo';

const Navigation = () => {
	const dispatch = useAppDispatch();
	const { push } = useRouter();
	const { session } = useAppSelector((state) => state.auth);
	const [menu, setMenu] = useState(false);

	const handleMenu = () => setMenu((prev) => !prev);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			dispatch(setSession(JSON.parse(localStorage.getItem('user'))));
		}
	}, [dispatch]);

	const Logout = async () => {
		dispatch(logout());
		dispatch(setSession(null));
		dispatch(setUserID(null));
		dispatch(reset());
		toast.success('Başarıyla Çıkış Yapıldı');
		push('/');
	};

	return (
		<div className='border-primary border-b-[1px]'>
			<div className='lg:mx-auto w-full lg:max-w-[990px]'>
				<div className='mx-5 lg:mx-0 flex items-center justify-between py-4 px-3'>
					<div className='font-medium text-xs cursor-pointer'>
						<Logo />
					</div>
					<div className='hidden lg:block'>
						{session ? (
							<div className='flex items-center space-x-4 font-medium text-[14px] cursor-pointer'>
								<div
									onClick={() => {
										push('/profile');
									}}
									className='cursor-pointer'
								>
									Profilim
								</div>
								<div className='cursor-pointer' onClick={Logout}>
									Çıkış Yap
								</div>
							</div>
						) : (
							<div className='flex items-center space-x-4 font-medium text-[14px]'>
								<div
									onClick={() => {
										push('/login');
									}}
									className='cursor-pointer'
								>
									Giriş Yap
								</div>
								<div
									onClick={() => {
										push('/register');
									}}
									className='cursor-pointer'
								>
									Kayıt Ol
								</div>
							</div>
						)}
					</div>
					{menu ? (
						<div className='lg:hidden fixed top-[68px] left-0 w-full bg-white z-50 min-h-screen flex items-center justify-center'>
							<div className='flex flex-col items-center justify-center text-center w-full'>
								{session ? (
									<span className='flex flex-col text-[18px] fond-bold text-black py-2 space-y-2 w-full p-3'>
										<div
											onClick={() => {
												push('/profile');
												setMenu(false);
											}}
											className='bg-blue-800 text-white w-full p-2 rounded-lg cursor-pointer'
										>
											Profilim
										</div>
										<div
											onClick={() => {
												push('/panel');
												setMenu(false);
											}}
											className='bg-blue-800 text-white w-full p-2 rounded-lg cursor-pointer'
										>
											Yönetim Paneli
										</div>
										<div
											className='text-md font-semibold text-red-800 cursor-pointer'
											onClick={() => {
												Logout();
												setMenu(false);
											}}
										>
											Çıkış Yap
										</div>
									</span>
								) : (
									<span className='flex flex-col text-[18px] fond-bold text-black py-2 space-y-2 w-full p-3'>
										<div
											onClick={() => {
												push('/login');
												setMenu(false);
											}}
											className='bg-blue-800 text-white w-full p-2 rounded-lg cursor-pointer'
										>
											Giriş Yap
										</div>
										<div
											onClick={() => {
												push('/register');
												setMenu(false);
											}}
											className='bg-blue-800 text-white w-full p-2 rounded-lg cursor-pointer'
										>
											Kayıt Ol
										</div>
									</span>
								)}
							</div>
						</div>
					) : null}
					<div className='block lg:hidden'>
						<TiThMenu onClick={handleMenu} className='text-red-800 font-bold text-xl cursor-pointer' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
