import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ToastProvider from '@/lib/toast';
import { PrimeReactProvider } from 'primereact/api';
import './globals.css';
import StoreProvider from './storeProvider';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='bg-[#f1f7fb]'>
				<StoreProvider>
					<PrimeReactProvider>
						<ToastProvider>
							<div className='flex flex-col justify-between min-h-screen'>
								<main>
									<Navigation />
									{children}
								</main>
								<Footer />
							</div>
						</ToastProvider>
					</PrimeReactProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
