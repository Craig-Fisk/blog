import { h } from 'preact';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Loader from '../../components/loader';
import Markdown from 'markdown-to-jsx';
import style from './style';

const project = (props) => {
	const [routeData, isLoading] = usePrerenderData(props);
	return routeData && routeData.data ? (
		<div class={style.container}>
			<h2>{routeData.data.details.title}</h2>
			<div class={style.titleCard}>
				<img src={routeData.data.details.cover} alt={routeData.data.details.title} />
			</div>
			<Markdown>{routeData.data.content}</Markdown>
		</div>
	) : (
		<Loader />
	);
};

export default project;
