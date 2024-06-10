import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		gender: {
			type: String
		},
		age: {
			type: Number
		},
		wordsIKnow: {
			type: Array,
			default: []
		},
		countriesILived: {
			type: Array,
			default: []
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (error) {
		return next(error);
	}
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
