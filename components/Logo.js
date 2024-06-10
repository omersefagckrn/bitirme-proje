import Link from 'next/link';

const Logo = () => {
	return (
		<Link href='/'>
			<div className='bg-white flex flex-row items-center justify-center px-3 py-0.5 rounded-full text-center space-x-2'>
				<div className='text-2xl font-bold text-primary'>Çabuk</div>
				<div className='text-2xl font-bold text-primary'>Öğren</div>
			</div>
		</Link>
	);
};

export default Logo;
