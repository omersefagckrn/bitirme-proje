import jwt from 'jsonwebtoken';

export const generateAuthToken = (id) => {
	const payload = { id };
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
	return token;
};
