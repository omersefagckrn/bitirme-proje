'use server';

import nodemailer from 'nodemailer';

export const sendMail = async (subject, to, text) => {
	const user = process.env.SMPT_EMAIL;
	const pass = process.env.SMTP_PASSWORD;

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user,
			pass
		}
	});

	const config = {
		from: user,
		to,
		subject,
		text,
		html: `
		<html>
		<head>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f0f0f0;
					padding: 20px;
				}
				.container {
					max-width: 600px;
					margin: 0 auto;
					background-color: #fff;
					padding: 30px;
					border-radius: 10px;
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
				}
				h1 {
					color: #333;
				}
				p {
					color: #666;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<h1>Çabuk Öğren Uygulamasına Hoş Geldiniz!</h1>
				<p>Merhaba, ${to}</p>
				<p>Başarılı bir şekilde kayıt oldunuz. Artık dil öğrenmeye başlayabilirsiniz!</p>
				<p>İyi günler dileriz.</p>
			</div>
		</body>
	</html>
    `
	};

	await new Promise((resolve, reject) => {
		transporter.sendMail(config, (error, response) => {
			if (error) {
				reject(error);
			} else {
				resolve(response);
			}
		});
	});
};
