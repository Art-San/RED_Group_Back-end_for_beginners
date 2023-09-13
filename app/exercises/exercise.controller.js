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

// @desc    Get exercises
// @route   GET /api/exercises
// @access  Private
export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany()
	res.json(exercises)
})

// @desc    update exercises
// @route   Update /api/exercises/:id
// @access  Private

export const updateExercises = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body
	const updatedExercise = await prisma.exercise.update({
		where: {
			id: 1
		},
		data: {
			name: name,
			times: times,
			iconPath: iconPath
		}
	})
	res.json(updatedExercise)
})

// @desc    Delete exercises
// @route   Delete /api/exercises/:id
// @access  Private

export const deleteExercises = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body
	const deleteExercise = await prisma.exercise.delete({
		where: {
			id: 1
		}
	})
	res.json('Упражнение удалено')
})
