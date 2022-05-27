import { h } from 'preact';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Loader from '../../components/loader';
import Markdown from 'markdown-to-jsx';
import style from './style';

const resume = (props) => {
	const [routeData, isLoading] = usePrerenderData(props);
	return routeData && routeData.data ? (
		<div class={style.container}>
			<h2 class={style.pageTitle}>Resume</h2>
			<Markdown>{routeData.data.content}</Markdown>
		</div>
	) : (
		<Loader />
	);
};

export default resume;
