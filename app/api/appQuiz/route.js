import AdminBackupQuiz from '@/models/adminBackupQuiz';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
	await connectDB();
	try {
		const allQuizzes = await AdminBackupQuiz.find({});

		/* if (allQuizzes.length === 0) {
			await AdminBackupQuiz.insertMany([quizData1, quizData2]);
		} */

		return NextResponse.json(allQuizzes, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	await connectDB();
	try {
		const { title, questions } = await request.json();

		const newQuiz = new AdminBackupQuiz({
			title,
			quiz: questions
		});

		await newQuiz.save();

		return NextResponse.json({ message: 'Quiz başarıyla oluşturuldu!' }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PUT(request) {
	await connectDB();
	try {
		const { quizId } = await request.json();
		const quiz = await AdminBackupQuiz.findById(quizId);

		if (!quiz) {
			return NextResponse.json({ message: 'Quiz bulunamadı!' }, { status: 404 });
		}

		quiz.published = !quiz.published;

		await quiz.save();

		return NextResponse.json(
			{
				message: `Quiz ${quiz.published ? 'yayına alındı!' : 'yayından kaldırıldı!'}`
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
