import { h } from "preact";
import { Link } from 'preact-router/match';
import { useEffect } from 'preact/hooks';
import {usePrerenderData} from "@preact/prerender-data-provider";
import Markdown from 'markdown-to-jsx';
import style from "./style";
import mugshot from '../../assets/mugshot.png';

const Home = (props) => {

	/**
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */

	useEffect(() => {
		if (window !== undefined && window.location.href.includes('#invite_token')) {
			const { href } = window.location;
			window.location.href= `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`;
		}
	},[]);

	const [routeData, isLoading] = usePrerenderData(props);

	return !isLoading ? (
		<div class={style.container}>
			<div class={style.g1_2}>
				<h2>Projects</h2>
				{routeData.data.projects.edges.map(item => (
                    <Link href={`/projects/${item.id}`} class={style.linkCard}><img src={item.details.card} alt={item.details.title} /></Link>
                ))}
			</div>
			<div class={style.g1_2}>
				<h2>About</h2>
				<img src={mugshot} class={style.floatRight} alt="Head shot of Craig Fisk" />
				<Markdown>
					{ routeData?.data?.content }
				</Markdown>
				<h2>Latest Blog</h2>
				{
					routeData?.data?.blog.map((item) =>
						(<div class={style.blog}>
							<h3>{item.data.details.title}</h3>
							<div class={style.tags}>
								{item.data.details.tags.split(', ').map(tag => (
									<span class={style.tag}>{tag}</span>
								))}
							</div>
							<div class={style.content}>
								<Markdown>
									{ item.data.details.snippet }
								</Markdown>
							</div>
							<Link href={item.url} class={style.buttonLink}>Read More</Link>
						</div>)
					)
				}
				
			</div>
		</div>
	) : (<div>Loading</div>);
};

export default Home;
