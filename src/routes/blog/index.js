import { h } from 'preact';
import { Suspense } from 'preact/compat';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Markdown from 'markdown-to-jsx';
import { FormattedCodeBlock } from './formatted-code-block';

import style from './style';
import Loader from '../../components/loader';

const blogs = (props) => {
	const [data, isLoading] = usePrerenderData(props);
	return <article class={style.blogcontainer}>{getBlogBody(data, isLoading)}</article>;
};

function CodeBlock(props) {
	const fallback = (
		<pre>
			<code>{props.children}</code>
		</pre>
	);
	return <FormattedCodeBlock {...props} />;
}

function InlineImage({ alt, title, src }) {
	return (
		<div class={style.inlineImageContainer}>
			<img class={style.inlineImage} src={src} alt={alt} />
			{title && <span class={style.inlineImageTitle}>{title}</span>}
		</div>
	);
}

function getBlogBody(data, isLoading) {
	if (isLoading) {
		return <Loader />;
	}

	if (data && data.data) {
		const { details, content } = data.data;
		return (
			<div>
				<h1 class={style.blogtitle}>{details.title}</h1>
				{details.subtitle && <caption class={style.blogsubtitle}>{details.subtitle}</caption>}
				{details.cover && (
					<div class={style.blogcover} style={`background-image:url(${details.cover})`} />
				)}
				<div class={style.blogbody}>
					<Markdown
						options={{
							overrides: {
								img: {
									component: InlineImage
								},
								code: {
									component: CodeBlock
								}
							}
						}}
					>
						{content}
					</Markdown>
				</div>
			</div>
		);
	}
}

export default blogs;
