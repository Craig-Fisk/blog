import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useState } from 'preact/hooks';
import style from './style';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(true);
	// let menuOpen = true;
	const handleOnClick = () => {
		setMenuOpen(!menuOpen);
	};
	return (
		<header class={style.header}>
			<Link href="/"><h1>Craig Fisk .co .uk</h1></Link>
			<button className={style.round} onClick={handleOnClick}>
				<svg viewBox="0 0 100 80" width="40" height="40">
					<rect width="100" height="20"></rect>
					<rect y="30" width="100" height="20"></rect>
					<rect y="60" width="100" height="20"></rect>
				</svg>
			</button>
			<nav className={menuOpen ? style.open: style.closed}>
				<Link onClick={handleOnClick} activeClassName={style.active} href="/blogs">Blog</Link>
				<Link activeClassName={style.active} href="/projects">Projects</Link>
				<Link activeClassName={style.active} href="/resume">Resume</Link>
			</nav>
		</header>);
};

export default Header;
