import { useState } from 'react';
import Aside from './Aside';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const PageLayout = () => {
	const [showAside, setShowAside] = useState(false);

	return (
		<div className="w-full flex">
			{/* Show on small screen */}

			<div
				className={`lg:hidden w-80 max-w-full fixed lg:relative z-20 ${
					showAside ? 'translate-x-0' : '-translate-x-full'
				} transform transition-transform ease-in-out`}
			>
				<Nav toggleAside={() => setShowAside(!showAside)} />
				<Aside />
			</div>
			{/* Show on large screen */}

			<div className={`lg:w-80 hidden lg:block w-5/6 fixed lg:relative `}>
				<Aside />
			</div>
			<div className={`w-full h-screen overflow-y-scroll bg-white`}>
				<Nav toggleAside={() => setShowAside(!showAside)} />
				<div className="max-w-5xl mx-auto px-5 mb-5 bg-white">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PageLayout;
