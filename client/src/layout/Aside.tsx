import { Link, useLocation } from 'react-router-dom';
import { menu } from '../utils';

const Aside = () => {
  const {pathname} = useLocation();

	const isActiveLink = (itemLink: string) => {
		return pathname === itemLink;
	};


	return (
		<aside className="flex flex-col w-full h-screen px-5 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-gray-900 border-gray-700">
			<Link to="/" className="text-primary font-bold text-2xl">
				User Management
			</Link>

			<div className="flex flex-col justify-between flex-1 mt-6">
				<nav className="flex-1 -mx-3 space-y-3 ">
					{menu.map((item, index) => (
						<Link
							key={index}
							className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-800 hover:text-gray-200 ${
								isActiveLink(item.link) ? 'bg-primary text-white' : ''
							}`}
							to={item.link}
						>
							<span className="mx-2 text-sm font-medium">{item.title}</span>
						</Link>
					))}
				</nav>
			</div>
		</aside>
	);
};

export default Aside;
