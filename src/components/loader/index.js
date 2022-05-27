import { h } from 'preact';
import style from './style';

const Loader = () => {
	return (
		<div className={style.container}>
			<div className={style['sk-cube-grid']}>
				<div className={`${style['sk-cube']} ${style['sk-cube1']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube2']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube3']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube4']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube5']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube6']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube7']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube8']}`} />
				<div className={`${style['sk-cube']} ${style['sk-cube9']}`} />
			</div>
		</div>
	);
};

export default Loader;
