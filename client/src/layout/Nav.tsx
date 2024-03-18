import { Link } from 'react-router-dom';
import { MenuIcon } from '../assets/svgIcons';

type NavProps = {
	toggleAside: () => void;
};
const Nav = ({ toggleAside }: NavProps) => {
	return (
		<div className="navbar shadow z-20 left-0 lg:left-auto lg:px-10">
			<div className="navbar-start lg:hidden">
				<Link to="/" className="btn btn-ghost text-primary text-xl">
					User Management
				</Link>
			</div>

			<div className="navbar-end">
				<div className="lg:hidden">
					<label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleAside}>
						<MenuIcon />
					</label>
				</div>
			</div>
		</div>
	);
};

export default Nav;
