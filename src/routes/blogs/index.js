import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Markdown from 'markdown-to-jsx';
import style from './style';
import Loader from '../../components/loader';

const blogs = (props) => {
	const [routeData, isLoading] = usePrerenderData(props);
	return routeData && routeData.data ? (
		<div class={style.container}>
			<h2 class={style.pageTitle}>Blog</h2>
			{routeData.data.edges.map((item) => (
				<div class={style.blog}>
					<h3>{item.details.title}</h3>
					<div class={style.tags}>
						{item.details.tags.split(', ').map((tag) => (
							<span class={style.tag}>{tag}</span>
						))}
					</div>
					<div class={style.content}>
						<Markdown>{item.details.snippet}</Markdown>
					</div>
					<Link href={`/blog/${item.id}`} class={style.buttonLink}>
						Read More
					</Link>
				</div>
			))}
		</div>
	) : (
		<Loader />
	);
};

export default blogs;
