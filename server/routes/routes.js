import express from 'express';
import UserModel from '../model/model.js';
import bcrypt from "bcrypt";

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
