import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
	email: Yup.string().email('Geçersiz email formatı!').required('Lütfen email giriniz.'),
	password: Yup.string().required('Lütfen şifre giriniz.')
});
s;
export const validationSchemaRegister = Yup.object({
	email: Yup.string().email('Geçersiz email formatı!').required('Lütfen email giriniz.'),
	password: Yup.string().required('Lütfen şifre giriniz.'),
	gender: Yup.string().required('Lütfen cinsiyet seçiniz.'),
	age: Yup.number().required('Lütfen yaşınızı giriniz.'),
	wordsIKnow: Yup.array(),
	countriesILived: Yup.array()
});

export const validationSchemaEditProfile = Yup.object({
	email: Yup.string().email('Geçersiz email formatı!')
});

export const validationSchemeResetPassword = Yup.object({
	password: Yup.string().required('Lütfen mevcut şifrenizi giriniz.'),
	newPassword: Yup.string().required('Lütfen yeni şifrenizi giriniz.'),
	newPasswordConfirm: Yup.string()
		.required('Lütfen yeni şifrenizi tekrar giriniz.')
		.oneOf([Yup.ref('newPassword'), null], 'Yeni şifreler uyuşmuyor!')
});

export const validationSchemaCreateQuiz = Yup.object().shape({
	title: Yup.string().required('Başlık gerekli').max(100, 'Başlık 100 karakterden kısa olmalıdır'),
	questions: Yup.array()
		.of(
			Yup.object().shape({
				question: Yup.string().required('Soru gerekli').max(200, 'Soru 200 karakterden kısa olmalıdır'),
				correctAnswer: Yup.string().required('Doğru cevap gerekli'),
				options: Yup.array().of(Yup.string().required('Seçenek gerekli')).min(4, 'En az 4 seçenek olmalı').max(4, 'En fazla 4 seçenek olmalı')
			})
		)
		.min(1, 'En az bir soru eklemelisiniz')
});
