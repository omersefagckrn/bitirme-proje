import { words } from '@/constants';
import Word from '@/models/word';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
	await connectDB();
	try {
		const word = await Word.find();

		if (word.length === 0) {
			await Word.insertMany(words);
		}

		return NextResponse.json({ word });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
