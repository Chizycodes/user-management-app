import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserDataType } from '../types/types';
// import { toast } from 'react-toastify';

const schema = yup.object().shape({
	firstName: yup.string().required('First Name is required'),
	lastName: yup.string().required('Last Name is required'),
	phoneNumber: yup.string().required('Phone Number is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
			'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
		),
	dateOfBirth: yup.string().required('Date of Birth is required'),
});

const AddUsers = () => {
	const {
		register,
		handleSubmit,
		// reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: UserDataType) => {
		console.log(data);
	};

	return (
		<div className="flex justify-center w-full mt-5">
			<div className="max-w-xl w-full">
				<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="text"
								placeholder="First Name"
                autoComplete='on'
								className={`grow ${errors.firstName ? 'border-red-500' : ''}`}
								{...register('firstName')}
							/>
						</label>
						{errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
					</div>

					<div>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="text"
								placeholder="Last Name"
                autoComplete='on'
								className={`grow ${errors.lastName ? 'border-red-500' : ''}`}
								{...register('lastName')}
							/>
						</label>
						{errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
					</div>

					<div>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="tel"
								placeholder="Phone Number"
                autoComplete='on'
								className={`grow ${errors.phoneNumber ? 'border-red-500' : ''}`}
								{...register('phoneNumber')}
							/>
						</label>
						{errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
					</div>

					<div>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="email"
								placeholder="Email"
                autoComplete='on'
								className={`grow ${errors.email ? 'border-red-500' : ''}`}
								{...register('email')}
							/>
						</label>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					<div>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="password"
								placeholder="Password"
                autoComplete='on'
								className={`grow ${errors.password ? 'border-red-500' : ''}`}
								{...register('password')}
							/>
						</label>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
					</div>

					<div>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="date"
								placeholder="Date of Birth"
                autoComplete='on'
								className={`grow ${errors.dateOfBirth ? 'border-red-500' : ''}`}
								{...register('dateOfBirth')}
							/>
						</label>
						{errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
					</div>

					<div className="mt-6">
						<button type="submit" className="btn btn-secondary w-full text-lg font-bold">
							Submit
							{/* {loading && <span className="loading loading-spinner loading-md"></span>} */}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddUsers;
