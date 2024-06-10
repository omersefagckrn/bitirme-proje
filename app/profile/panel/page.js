'use client';

import DeleteUser from '@/components/profile/DeleteUser';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllUsers } from '@/lib/reducers/panel/reducer';
import { useEffect, useMemo } from 'react';
import CreateQuiz from '../../../components/profile/quiz/page';

const Panel = () => {
	const dispatch = useAppDispatch();
	const { allUsers, isLoadingGetAllUsers } = useAppSelector((state) => state.panel);
	const users = useMemo(() => allUsers?.users || [], [allUsers]);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	if (isLoadingGetAllUsers) {
		return <div className='py-2 text-red-800 text-xs'>Kullanıcılar yükleniyor...</div>;
	}

	return (
		<>
			<DeleteUser users={users ?? []} />

			<hr className='my-4 mx-6 border-[1px] border-primary rounded-full' />

			<CreateQuiz />
		</>
	);
};

export default Panel;
