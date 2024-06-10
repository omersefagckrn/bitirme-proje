'use client';

import SVG_1 from '@/public/svg/1.svg';
import SVG_2 from '@/public/svg/2.svg';
import SVG_3 from '@/public/svg/3.svg';
import SVG_4 from '@/public/svg/4.svg';
import SVG_5 from '@/public/svg/5.svg';
import SVG_6 from '@/public/svg/6.svg';
import Image from 'next/image';

const Layout = () => {
	return (
		<div className='mx-auto w-full lg:max-w-[988px] p-3 lg:p-0 mb-[40px]'>
			<div className='flex flex-col lg:flex-row items-center'>
				<div>
					<Image src={SVG_1} width={'100%'} height={'100%'} alt='logo' />
				</div>
				<div className='lg:w-[480px] flex flex-col space-y-4'>
					<div className='text-[28px] text-[#4b4b4b] leading-normal text-center font-bold'>Dil öğrenmenin ücretsiz, eğlenceli ve etkili yolu!</div>
				</div>
			</div>
			<div className='flex flex-col lg:flex-row items-center'>
				<div className='flex flex-col space-y-4 w-full lg:max-w-[503px]'>
					<div className='text-[48px] text-primary leading-normal font-bold'>ücretsiz. eğlenceli. etkili.</div>
					<div className='text-[17px] leading-[24px] text-[#777777] font-medium'>
						Çabuk Öğren ile öğrenmek hem eğlencelidir hem de araştırmalarımız işe yaradığını gösterir! Hızlı ve kısa süren derslerle gerçek hayattaki
						iletişim becerilerini kazanırken puan kazanır ve yeni düzeylerin kilidini açabilirsin.
					</div>
				</div>
				<div>
					<Image className='object-cover' src={SVG_2} width={'100%'} height={'100%'} alt='logo' />
				</div>
			</div>
			<div className='flex flex-col lg:flex-row items-center'>
				<div>
					<Image className='object-cover' src={SVG_3} width={'100%'} height={'100%'} alt='logo' />
				</div>
				<div className='flex flex-col space-y-4 w-full lg:max-w-[503px]'>
					<div className='text-[48px] text-primary leading-normal font-bold'>bilime dayalı</div>
					<div className='text-[17px] leading-[24px] text-[#777777] font-medium'>
						Okuma, yazma, dinleme ve konuşma becerilerini etkili bir öğreten kurslar oluşturmak için araştırmaya dayalı öğretim yöntemleri ile keyifli
						içeriğin bir kombinasyonunu kullanıyoruz!
					</div>
				</div>
			</div>
			<div className='flex flex-col lg:flex-row items-center'>
				<div className='flex flex-col space-y-4 w-full lg:max-w-[503px]'>
					<div className='text-[48px] text-primary leading-normal font-bold'>motivasyonunu koru</div>
					<div className='text-[17px] leading-[24px] text-[#777777] font-medium'>
						Oyun tarzında özellikler, eğlenceli mücadeleler ve dost canlısı maskotumuz baykuş hatırlatmaları ile dil öğrenimini alışkanlık haline
						getirmeyi kolaylaştırıyoruz.
					</div>
				</div>
				<div>
					<Image className='object-cover' src={SVG_4} width={'100%'} height={'100%'} alt='logo' />
				</div>
			</div>
			<div className='flex flex-col lg:flex-row items-center'>
				<div>
					<Image className='object-cover' src={SVG_5} width={'100%'} height={'100%'} alt='logo' />
				</div>
				<div className='flex flex-col space-y-4 w-full lg:max-w-[503px]'>
					<div className='text-[48px] text-primary leading-normal font-bold'>kişiselleştirilmiş öğrenim</div>
					<div className='text-[17px] leading-[24px] text-[#777777] font-medium'>
						Yapay zeka ve dil biliminin en yararlı özelliklerinin bir araya getirildiği derslerimiz, en doğru düzey ve hızda öğrenmene yardımcı olacak
						şekilde sana özel hale geliyor.
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<div className='flex flex-col lg:flex-row items-center'>
					<div className='flex flex-col space-y-4 w-full lg:max-w-[503px]'>
						<div className='text-[48px] text-primary leading-normal font-bold'>Power Up With Çabuk Öğren</div>
					</div>
					<div>
						<Image className='object-cover' src={SVG_6} width={'100%'} height={'100%'} alt='logo' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
