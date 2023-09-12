import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { croppedUser } from '../utils/user.utils.js'
import 'colors'

export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.userId
			},
			select: croppedUser
		})

		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Не авторизовано, токен problem')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Не авторизован, у меня нет токена')
	}
})
