'use client';

import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider({ children }) {
	return (
		<>
			{children}
			<ToastContainer
				progressStyle={{
					background: '#fff',
					opacity: '0.8'
				}}
				theme='dark'
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick={true}
				transition={Bounce}
			/>
		</>
	);
}
