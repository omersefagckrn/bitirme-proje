import { sendMail } from '@/lib/mail';
import User from '@/models/user';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
	await connectDB();
	try {
		const { email, password, gender, age, wordsIKnow, countriesILived } = await request.json();
		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return NextResponse.json({ message: 'Bu e-posta adresi zaten kullanımda.' }, { status: 400 });
		}

		const user = new User({
			email,
			password,
			gender,
			age,
			wordsIKnow,
			countriesILived
		});

		await user.save();

		await sendMail('Başarılı Kayıt', email, 'Başarılı bir şekilde kayıt oldunuz.');

		return NextResponse.json({ message: 'Başarıyla kayıt oldunuz, Yönlendiriliyorsunuz.' }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
