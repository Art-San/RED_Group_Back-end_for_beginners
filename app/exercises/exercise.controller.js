import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Create new exercise
// @route   Post /api/exercises
// @access  Private
export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body
	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})

	res.json(exercise)
})

// @desc    update exercises
// @route   Put /api/exercises/:id
// @access  Private

export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	try {
		const updatedExercise = await prisma.exercise.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name: name,
				times: times,
				iconPath: iconPath
			}
		})
		res.json(updatedExercise)
	} catch (error) {
		res.status(404)
		throw new Error('Что то при обновлении пошло не так, возможно не найдено')
	}
})

// @desc    Get exercises
// @route   GET /api/exercises
// @access  Private
export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	res.json(exercises)
})

// @desc    Delete exercises
// @route   Delete /api/exercises/:id
// @access  Private

export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		const deleteExercise = await prisma.exercise.delete({
			where: {
				id: Number(req.params.id)
			}
		})
		res.json({ message: 'Упражнение удалено' })
	} catch (error) {
		res.status(404)
		throw new Error('возможно не чего удалять ')
	}
})
