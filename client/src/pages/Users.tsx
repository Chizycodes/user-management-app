import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserDataType } from '../types/types';
import moment from 'moment';
import Pagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const Users = () => {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

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

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		console.log(newPage);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// Pagination logic
	const limit = 10;
	const totalPages = Math.ceil(users?.length / limit);
	// Calculate start and end indexes for current page
	const startIndex = (currentPage - 1) * limit;
	const endIndex = startIndex + limit;
	// Slice users array to display users for current page
	const usersForPage = users.slice(startIndex, endIndex);

	return (
		<div className="mt-5">
			<h1 className="text-xl font-bold text-center mb-5 text-gray-700">Users</h1>
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
							{usersForPage?.map((user: UserDataType) => (
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

				{users.length > 0 && (
					<div className="flex justify-end mt-5 pagination">
						<Pagination current={currentPage} total={totalPages} onPageChange={handlePageChange} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Users;
