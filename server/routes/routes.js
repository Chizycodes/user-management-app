import express from 'express';
import UserModel from '../model/model.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
	try {
		const data = await UserModel.find();
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
		return res.status(400).json({ status: 'error', message: 'User already exists' });
	}

	try {
		const newUser = new UserModel(req.body);
		const data = await newUser.save();
		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ status: 'error', message: error.message });
	}
});

// Update a user
router.patch('/:id', async (req, res) => {
	const id = req.params.id;
	const userExists = await UserModel.findById(id);
	if (!userExists) {
		return res.status(400).json({ status: 'error', message: `User with id ${id} does not exist` });
	}
	try {
		const updatedData = req.body;
		const options = { new: true };
		const data = await UserModel.findByIdAndUpdate(id, updatedData, options);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ status: 'error', message: error.message });
	}
});

//Delete user by id
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const userExists = await UserModel.findById(id);

	if (!userExists) {
		return res.status(400).json({ status: 'error', message: `User with id ${id} does not exist` });
	}
	try {
		const data = await UserModel.findByIdAndDelete(id);
		res.status(200).json({ status: 'success', message: `User with email ${data.email} deleted` });
	} catch (error) {
		res.status(400).json({ status: 'error', message: error.message });
	}
});

export default router;
