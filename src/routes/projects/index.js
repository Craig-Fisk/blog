import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import reflector from '../../assets/reflector.png';
import style from './style';

const projects = (props) => {
	const [data, isLoading] = usePrerenderData(props);
    console.log(data);
	return (
		<div class={style.projects}>
			<h1 class={style.pageTitle}>Projects</h1>
			<div class={style.container}>
                <Link href="/" class={style.linkCard}><img src={reflector} alt="Project: Reflector" /></Link>
            </div>
		</div>
	);
};

export default projects;
