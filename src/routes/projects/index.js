import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Loader from '../../components/loader';
import style from './style';

const projects = (props) => {
	const [routeData, isLoading] = usePrerenderData(props);
	return routeData && routeData.data ? (
		<div class={style.projects}>
			<h2 class={style.pageTitle}>Projects</h2>
			<div class={style.container}>
				{routeData.data.edges.map((item) => (
					<Link href={`/projects/${item.id}`} class={style.linkCard}>
						<img src={item.details.card} alt={item.details.title} />
					</Link>
				))}
			</div>
		</div>
	) : (
		<Loader />
	);
};

export default projects;
