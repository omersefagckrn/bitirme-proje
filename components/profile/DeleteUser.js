'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { deleteUser, getAllUsers, resetDeleteUser } from '@/lib/reducers/panel/reducer';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { RiAdminFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

const DeleteUser = ({ users }) => {
	const dispatch = useAppDispatch();
	const { isErrorDeleteUser, isSuccessDeleteUser, messageDeleteUser } = useAppSelector((state) => state.panel);

	useEffect(() => {
		if (isSuccessDeleteUser) {
			toast.success(messageDeleteUser);
			dispatch(getAllUsers());
			dispatch(resetDeleteUser());
		}

		if (isErrorDeleteUser) {
			toast.error(messageDeleteUser);
			dispatch(getAllUsers());
			dispatch(resetDeleteUser());
		}
	});

	const handleDeleteUser = async (id) => {
		await dispatch(deleteUser({ id }));
	};

	return (
		<>
			<div className='font-semibold py-4'>Kullanıcı Sil</div>

			{!users.length && <div className='py-2 text-red-800 text-xs'>Hiç Kayıtlı kullanıcı bulunamadı.</div>}

			<DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableClassName='whitespace-nowrap' value={users} size='normal' tableStyle={{ minWidth: '50rem' }}>
				<Column
					field={(r) =>
						r?.isAdmin ? (
							<RiAdminFill className='w-5 h-5 select-none' />
						) : (
							<IoIosCloseCircle onClick={() => handleDeleteUser(r?._id)} className='text-red-800 select-none w-5 h-5 cursor-pointer' />
						)
					}
				></Column>
				<Column
					field={(r) => {
						return r?.createdAt ? new Date(r?.createdAt).toLocaleDateString() : '';
					}}
					header='Kayıt Tarihi'
				></Column>
				<Column field='email' header='E-Mail'></Column>
				<Column field='gender' header='Cinsiyet'></Column>
				<Column field='age' header='Yaş'></Column>

				<Column
					header='Yaşadığı Ülkeler'
					field={(r) => {
						return r?.countriesILived?.join(', ');
					}}
				></Column>
				<Column
					header='Bildiği kelimeler'
					field={(r) => {
						return r?.wordsIKnow?.join(', ');
					}}
				></Column>
			</DataTable>
		</>
	);
};

export default DeleteUser;
