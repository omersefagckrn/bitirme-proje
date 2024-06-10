import AdminBackupQuiz from '@/models/adminBackupQuiz';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
	await connectDB();
	try {
		const { quizId } = await request.json();
		const quiz = await AdminBackupQuiz.findOneAndDelete({ _id: quizId });

		if (!quiz) {
			return NextResponse.json({ message: 'Quiz bulunamadı!' }, { status: 404 });
		}

		return NextResponse.json({ message: 'Quiz başarıyla silindi!' }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
