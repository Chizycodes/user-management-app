import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import AddUsers from './pages/AddUsers';
import Users from './pages/Users';
import Error404 from './pages/Error404';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route element={<PageLayout />}>
						<Route index element={<AddUsers />} />
						<Route path="users" element={<Users />} />
					</Route>
					<Route path="*" element={<Error404 />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
