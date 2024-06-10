import { generateAuthToken } from '@/helper/token';
import User from '@/models/user';
import connectDB from '@/utils/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
	await connectDB();
	try {
		const { email, password } = await request.json();

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 400 });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return NextResponse.json({ message: 'Geçersiz şifre.' }, { status: 400 });
		}

		const token = generateAuthToken(user._id);

		return NextResponse.json({ token, isAdmin: user.isAdmin, userID: user._id });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
