import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Markdown from 'markdown-to-jsx';
import style from './style';

const blogs = (props) => {
	const [routeData, isLoading] = usePrerenderData(props);
	console.log(routeData);
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
		<div>Loading...</div>
	);
};

function getBlogsListing(data, isLoading) {
	if (isLoading) {
		return (
			<article class={style.loadingPlaceholder}>
				<h2 class={`${style.blogtitle} loading`}>&nbsp;</h2>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
			</article>
		);
	}
	if (data && data.data) {
		const { data: blogs } = data;
		return (
			<>
				{blogs.edges.map((blog) => (
					<Link href={`/blog/${blog.id}`}>
						<article>
							<h2>{blog.details.title}</h2>
							<div>
								{(
									blog.details.tags.substr(1, blog.details.tags.length - 2).split(',') ||
									[]
								).map((tag) => (
									<span class={style.tag}>{tag}</span>
								))}
							</div>
							<p class={style.preview}>{blog.preview}</p>
						</article>
					</Link>
				))}
			</>
		);
	}
}

export default blogs;
