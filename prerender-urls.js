const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
const parseMD = require('parse-md').default;

const files = generateFileList(join(__dirname, 'content')).nodes;
const blogs = files.find(elem => elem.id === 'blog');
const projects = files.find(elem => elem.id === 'project');

function generateBlogPageData(blog) {
	let data;
	if (blog.format === 'md') {
		const { content } = parseMD(fs.readFileSync(join('content', 'blog', blog.id), 'utf-8'));
		data = content;
	} else {
		data = fs.readFileSync(join('content', 'blog', blog.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
	}
	return {
		url: `/blog/${blog.id}`,
		seo: blog.details,
		data: {
			details: blog.details,
			content: data
		}
	};
}

module.exports = () => {
	const pages = [
		{
			url: '/',
			seo: {
				cover: '/assets/profile.jpg'
			},
			data: parseMD(fs.readFileSync(join('content', 'pages', 'root', 'about.md'), 'utf-8'))
		},
		{ url: '/contact/' },
		{ url: '/contact/success' }
	];

	// adding blogs list posts page
	pages.push({
		url: '/blogs/',
		data: blogs
	});

	pages.push({
		url: '/projects/',
		data: projects
	});

	const blogPages = [...blogs.edges.map(blog => generateBlogPageData(blog))];
	pages.push(...blogPages);

	pages[0].data['blog'] = blogPages.slice(0, 3);
	pages[0].data['projects'] = projects;

	return pages;
};
