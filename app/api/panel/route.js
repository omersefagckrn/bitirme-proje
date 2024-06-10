import User from '@/models/user';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
	await connectDB();
	try {
		const users = await User.find({}).select('-password');

		return NextResponse.json({ users });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	await connectDB();
	try {
		const { id } = await request.json();

		const user = await User.findOneAndDelete({ _id: id });

		if (!user) {
			return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 404 });
		}

		return NextResponse.json({ message: 'Kullanıcı başarıyla silindi.' });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
