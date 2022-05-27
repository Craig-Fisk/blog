import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import reflector from '../../assets/reflector.png';
import style from './style';

const projects = (props) => {
	const [routeData, isLoading] = usePrerenderData(props);
	return routeData && routeData.data ? (
		<div class={style.projects}>
			<h1 class={style.pageTitle}>Projects</h1>
			<div class={style.container}>
                {routeData.data.edges.map(item => (
                    <Link href={`/projects/${item.id}`} class={style.linkCard}><img src={item.details.card} alt={item.details.title} /></Link>
                ))}
            </div>
		</div>
	) : (
        <div>Loading...</div>
    );
};

export default projects;
