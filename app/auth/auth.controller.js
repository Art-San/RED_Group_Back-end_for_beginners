import { prisma } from '../prisma.js'
import asyncHandler from 'express-async-handler'
// @desc  Auth user
// @route POST /api/auth/login
// @access Public

export const authUser = asyncHandler(async (req, res) => {
	const users = await prisma.user.findMany()
	res.json(users)
	// res.json({ message: 'Ты авторизовался' })
})
