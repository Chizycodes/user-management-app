import express from 'express';
import UserModel from '../model/model.js';
import bcrypt from "bcrypt";

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
	try {
		// Extract query parameters for date of birth range filtering
		const { minDOB, maxDOB } = req.query;

		let query = {};

		// If both minDOB and maxDOB parameters are provided, add date of birth range filtering to the query
		if (minDOB && maxDOB) {
			query.dateOfBirth = { $gte: new Date(minDOB), $lte: new Date(maxDOB) };
		} else if (minDOB) {
			// If only minDOB parameter is provided, add minimum date of birth filtering
			query.dateOfBirth = { $gte: new Date(minDOB) };
		} else if (maxDOB) {
			// If only maxDOB parameter is provided, add maximum date of birth filtering
			query.dateOfBirth = { $lte: new Date(maxDOB) };
		}

		const data = await UserModel.find(query);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Create a new user
router.post('/', async (req, res) => {
	const { email } = req.body;
	const userExists = await UserModel.findOne({ email });

	if (userExists) {
		return res.status(400).json({ message: 'User already exists' });
	}

	try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const newUser = await UserModel.create({ ...req.body, password: hashedPassword });
    const {password, ...rest} = newUser.toObject();
		res.status(201).json(rest);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Update a user
router.patch('/:id', async (req, res) => {
	const id = req.params.id;
	const userExists = await UserModel.findById(id);
	if (!userExists) {
		return res.status(400).json({ message: `User with id ${id} does not exist` });
	}
	try {
		const updatedData = req.body;
		const options = { new: true };
		const data = await UserModel.findByIdAndUpdate(id, updatedData, options);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete user by id
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const userExists = await UserModel.findById(id);

	if (!userExists) {
		return res.status(400).json({ message: `User with id ${id} does not exist` });
	}
	try {
		const data = await UserModel.findByIdAndDelete(id);
		res.status(200).json({ message: `User deleted` });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

export default router;
