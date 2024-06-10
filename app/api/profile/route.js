import User from '@/models/user';
import connectDB from '@/utils/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
	await connectDB();
	try {
		const { userID } = await request.json();

		const user = await User.findOne({ _id: userID }).select('-password');

		if (!user) {
			return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 404 });
		}

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PUT(request) {
	await connectDB();
	try {
		const { userID, profile } = await request.json();

		const updatedUser = await User.findById(userID);

		if (!updatedUser) {
			return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 404 });
		}

		const newWords = profile.wordsIKnow.filter((word) => !updatedUser.wordsIKnow.includes(word));
		const newCountries = profile.countriesILived.filter((country) => !updatedUser.countriesILived.includes(country));

		updatedUser.wordsIKnow.push(...newWords);
		updatedUser.countriesILived.push(...newCountries);

		updatedUser.email = profile.email || updatedUser.email;
		updatedUser.gender = profile.gender || updatedUser.gender;
		updatedUser.age = profile.age || updatedUser.age;

		await updatedUser.save();

		return NextResponse.json({ user: updatedUser });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(request) {
	await connectDB();
	try {
		const { userID, password, newPassword } = await request.json();

		const user = await User.findById(userID);

		if (!user) {
			return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 404 });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json({ message: 'Eski şifren yanlış!' }, { status: 400 });
		}

		if (!newPassword) {
			return NextResponse.json({ message: 'Yeni şifre gereklidir.' }, { status: 400 });
		}

		user.password = newPassword;
		await user.save();

		return NextResponse.json({ message: 'Şifre başarıyla güncellendi.' });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
