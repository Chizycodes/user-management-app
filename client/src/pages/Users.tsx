import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserDataType } from '../types/types';
import moment from 'moment';

const Users = () => {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
			setUsers(res.data);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			toast.error(err?.response?.data?.message ?? err?.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<div className="mt-5">
			<div className="overflow-x-auto">
				{loading ? (
					<div className="flex justify-center mt-5">
						<span className="loading loading-spinner text-primary loading-lg"></span>
					</div>
				) : users?.length > 0 ? (
					<table className="table table-zebra">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone Number</th>
								<th>Date of Birth</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user: UserDataType) => (
								<tr key={user._id}>
									<th>{`${user.firstName} ${user.lastName}`}</th>
									<td>{user.email}</td>
									<td>{user.phoneNumber}</td>
									<td>{moment(user.dateOfBirth).format('Do MMM YYYY')}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="flex justify-center mt-5">
						<p className="font-medium text-lg">No user found</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Users;
