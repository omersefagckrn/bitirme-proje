import AdminBackupQuiz from '@/models/adminBackupQuiz';
import User from '@/models/user';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
	await connectDB();
	try {
		const { userId, quizId, answers } = await request.json();

		const quiz = await AdminBackupQuiz.findById(quizId);
		const user = await User.findById(userId);

		if (!quiz || !user) {
			return NextResponse.json({ message: 'Quiz veya kullanıcı bulunamadı!' }, { status: 404 });
		}

		const userAnswers = answers?.map((answer, index) => {
			const question = quiz.quiz[index];
			return {
				questionIndex: index,
				question: question.question,
				selectedAnswer: answer.selectedAnswer,
				correctAnswer: question.correctAnswer,
				isCorrect: answer.selectedAnswer === question.correctAnswer
			};
		});

		quiz.completedStudents.push({
			userId,
			email: user.email,
			answers: userAnswers
		});

		await quiz.save();

		return NextResponse.json({ message: 'Quiz başarıyla tamamlandı!' }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
