'use client';

import TextToSpeech from '@/components/TextToSpeech';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getWord } from '@/lib/reducers/word/reducer';
import { useEffect, useMemo, useState } from 'react';

const WordGame = () => {
	const dispatch = useAppDispatch();
	const { word, wordLoading } = useAppSelector((state) => state.word);
	const [categories, setCategories] = useState([]);
	const [filteredCategory, setFilteredCategory] = useState('Hepsi');

	const words = useMemo(() => word?.word || [], [word]);

	useEffect(() => {
		dispatch(getWord());
	}, [dispatch]);

	useEffect(() => {
		const allCategories = words.map((word) => word.category);
		const uniqueCategories = Array.from(new Set(allCategories));
		setCategories(['Hepsi', ...uniqueCategories]);
	}, [words]);

	const handleCategoryChange = (e) => {
		setFilteredCategory(e.target.value);
	};

	if (wordLoading) {
		return <div className='text-xs text-red-800 py-2'>Kelimeler yükleniyor...</div>;
	}

	return (
		<>
			<div>
				<div className='font-bold text-xl pt-4'>Kelime Havuzu</div>
				<div className='text-sm text-gray-600 py-2'>
					Öğrenmek istediğiniz kelimeleri buradan inceleyebilirsiniz. Kelimelerin üzerine tıklayarak sesli dinleyebilirsiniz.
				</div>
				<div className='text-xs'>
					Aktif Kategori: <span className='text-red-800 font-bold text-[14px]'>{filteredCategory}</span>
				</div>
				<div className='relative'>
					<select
						className='block appearance-none mt-2 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						value={filteredCategory}
						onChange={handleCategoryChange}
					>
						{categories?.map((category, index) => (
							<option key={index} value={category}>
								{category}
							</option>
						))}
					</select>
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
						<svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
							<path
								fillRule='evenodd'
								d='M10.293 12.707a1 1 0 0 0 1.414-1.414l-3-3a1 1 0 0 0-1.414 1.414L9.586 11l-2.293 2.293a1 1 0 0 0 1.414 1.414l3-3z'
							/>
						</svg>
					</div>
				</div>

				<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 select-none'>
					{words
						.filter((word) => filteredCategory === 'Hepsi' || word.category === filteredCategory)
						.map((word, idx) => (
							<div key={idx} className='bg-gray-200 rounded-md p-4 space-y-2'>
								<div>
									<span className='font-semibold text-red-800'>İngilizce:</span>
									<span>
										<TextToSpeech text={word.english.toUpperCase()} />
									</span>
								</div>
								<div>
									<span className='font-semibold text-red-800'>Türkçe:</span>{' '}
									<span>
										<TextToSpeech text={word.turkish.toUpperCase()} />
									</span>
								</div>
								<div>
									<span className='font-semibold text-red-800'>Kategori:</span> {word.category || 'Belirtilmemiş'}
								</div>
								<div>
									<span className='font-semibold text-red-800'>Zorluk:</span> {word.difficulty}
								</div>

								<div>
									<span className='font-semibold text-red-800'>Örnek Cümleler:</span>
									<ul className='list-disc pl-4'>
										{word.exampleSentences?.map((sentence, idx) => (
											<li key={idx}>{sentence}</li>
										))}
									</ul>
								</div>
								<div>
									<span className='font-semibold text-red-800'>Etimoloji:</span> {word.etymology || 'Belirtilmemiş'}
								</div>
								<div>
									<span className='font-semibold text-red-800'>Ek Bilgi*:</span> {word.additionalInformation || 'Belirtilmemiş'}
								</div>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default WordGame;
