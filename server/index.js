import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import router from './routes/routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/users', router);

const startServer = () => {
	try {
		connectDB(process.env.DATABASE_URL);

		app.listen(5000, () => console.log('Server started on port http://localhost:5000'));
	} catch (error) {
		console.log(error, 'error');
	}
};

startServer();