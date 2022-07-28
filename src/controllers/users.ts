import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

import { Prisma } from '@prisma/client';
import { User } from '../modules/users/model/User';

const constants = {
	jwt_cookie: 'backend_login_token',
	cookie_config: {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
	},
};

const getUsersController = async (
	_: express.Request,
	res: express.Response
) => {
	try {
		const users = await prisma.user.findMany();
		return res.status(200).json({ data: users });
	} catch (e) {
		return res.status(500).json({
			error: e,
		});
	}
};

const createUser = async (req: express.Request, res: express.Response) => {
	try {
		const { username, password, email } = req.body;

		if (!username || !password || !email) {
			return res.status(500).json({
				error: 'Some field is missing on request body.',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUserPayload = new User();
		Object.assign(newUserPayload, {
			username,
			password: hashedPassword,
			email,
			id: '2'
		});

		const user = await prisma.user.create({ data: newUserPayload });

		if (!process.env.SECRET) {
			return res.status(500).json({
				error: 'JWT Secret is missing',
			});
		}

		const token = jwt.sign(user, process.env.SECRET, { expiresIn: 300 });

		return res
			.cookie(constants.jwt_cookie, token, constants.cookie_config)
			.status(200)
			.json({
				user: user,
			});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			if (error.code === 'P2002') {
				return res.status(500).json({
					error:
            'There is a unique constraint violation, a new user cannot be created with this email',
				});
			}
		}

		return res.status(500).json({
			error: error,
		});
	}
};

const login = async (req: express.Request, res: express.Response) => {
	const { email, password } = req?.body || null;

	if (!email || !password) {
		return res.status(500).json({
			error: 'Please send a valid e-mail and password',
		});
	}

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user) {
		return res.status(500).json({
			error: 'Invalid e-mail or password',
		});
	}

	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		return res.status(500).json({
			error: 'Invalid e-mail or password',
		});
	}

	const token = jwt.sign(user, process.env.SECRET!, { expiresIn: 300 });

	return res
		.status(200)
		.cookie(constants.jwt_cookie, token, constants.cookie_config)
		.json({
			message: 'Successfully logged in',
		});
};

export default {
	getUsersController,
	createUser,
	login,
};
