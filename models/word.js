import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema(
	{
		english: {
			type: String,
			required: true,
			unique: true
		},
		turkish: {
			type: String,
			required: true,
			unique: true
		},
		category: {
			type: String,
			required: true
		},
		difficulty: {
			type: Number,
			required: true
		},
		exampleSentences: {
			type: [String]
		},
		etymology: {
			type: String
		},
		additionalInformation: {
			type: String
		}
	},
	{
		versionKey: false
	}
);

const Word = mongoose.models.Word || mongoose.model('Word', wordSchema);

export default Word;
