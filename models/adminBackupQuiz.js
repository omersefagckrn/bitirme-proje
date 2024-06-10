import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true
		},
		options: {
			type: [String],
			required: true
		},
		correctAnswer: {
			type: String,
			required: true
		}
	},
	{ _id: false }
);

const answerSchema = new mongoose.Schema(
	{
		questionIndex: Number,
		question: String,
		selectedAnswer: String,
		correctAnswer: String,
		isCorrect: Boolean
	},
	{ _id: false }
);

const completedStudentSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		email: {
			type: String,
			required: true
		},
		answers: [answerSchema]
	},
	{ _id: false }
);

const adminBackupQuizSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		quiz: [questionSchema],
		published: {
			type: Boolean,
			default: false
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		completedStudents: [completedStudentSchema]
	},
	{
		versionKey: false
	}
);

const AdminBackupQuiz = mongoose.models.AdminBackupQuiz || mongoose.model('AdminBackupQuiz', adminBackupQuizSchema);

export default AdminBackupQuiz;
